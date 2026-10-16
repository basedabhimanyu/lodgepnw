// Done-list checks from PRD section 9.
import { chromium } from 'playwright-core'
const exe = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
const base = process.argv[2] ?? 'http://localhost:5173/'
const browser0 = await chromium.launch({ executablePath: exe })
// Protected Vercel previews: pass the project's automation bypass secret as BYPASS.
const browser = process.env.BYPASS
  ? { newPage: (o = {}) => browser0.newPage({ ...o, extraHTTPHeaders: { 'x-vercel-protection-bypass': process.env.BYPASS } }), close: () => browser0.close() }
  : browser0
const results = []
const ok = (name, pass, detail = '') => results.push(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`)

// 1. Swipe & Swap on all 8 leak cards
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.locator('#leaks').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500)
  const ids = await page.$$eval('[data-leak]', (els) => els.map((e) => e.dataset.leak))
  let swapped = 0, flew = 0
  for (const id of ids) {
    const card = page.locator(`[data-leak="${id}"]`)
    await card.scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await card.hover()
    if (await page.waitForFunction(() => document.querySelectorAll('body > svg > g').length > 0, null, { timeout: 1200 }).then(() => true).catch(() => false)) flew++
    await page.waitForFunction((id) => Number(getComputedStyle(document.querySelector(`[data-leak="${id}"] [data-fixed]`)).opacity) > 0.9, id, { timeout: 3000 }).catch(() => {})
    const st = await card.evaluate((c) => ({
      fixed: Number(getComputedStyle(c.querySelector('[data-leak-fixed]')).opacity),
      stamp: Number(getComputedStyle(c.querySelector('[data-fixed]')).opacity),
    }))
    if (st.fixed > 0.9 && st.stamp > 0.9) swapped++
    else console.log("card", id, JSON.stringify(st))
    await page.mouse.move(5, 5)
  }
  ok('Swipe & Swap fixes all 8 leak cards', swapped === 8 && ids.length === 8, `${swapped}/${ids.length} swapped, sack flew ${flew}x`)
  const before = await page.evaluate(() => Number(document.body.dataset.swipes))
  await page.locator('[data-leak]').first().hover()
  await page.waitForTimeout(300)
  const after = await page.evaluate(() => Number(document.body.dataset.swipes))
  ok('A fixed card is not swiped again', after === before, `swipes ${before} -> ${after}`)
  const chip = await page.locator('[data-all-fixed]').evaluate((e) => Number(getComputedStyle(e).opacity))
  ok('All 8 fixed shows the teardown prompt', chip > 0.9)
  ok('No page errors on desktop', errors.length === 0, errors.join(' | '))
  await page.close()
}

// 1b. Rapid hovers queue up (one sack)
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.evaluate(() => window.scrollTo(0, document.querySelector('#leaks').offsetTop + 200))
  await page.waitForTimeout(1500)
  for (const i of [0, 1, 2]) await page.locator('[data-leak]').nth(i).hover()
  await page.waitForTimeout(4000)
  const n = await page.$$eval('[data-leak-fixed]', (els) => els.slice(0, 3).filter((e) => Number(getComputedStyle(e).opacity) > 0.9).length)
  ok('Rapid hovers queue and all get fixed', n === 3, `${n}/3`)
  await page.close()
}

// 2. Rotator: all 30, headline never changes height
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.clock.install()
  await page.goto(base, { waitUntil: 'networkidle' })
  const seen = new Set()
  const heights = new Set()
  for (let i = 0; i < 31; i++) {
    for (let s = 0; s < 6; s++) {
      await page.clock.runFor(400)
      const st = await page.evaluate(() => {
        const h1 = document.querySelector('h1')
        const cur = document.querySelector('h1 [aria-hidden] > span > span:last-of-type')
        return { h: Math.round(h1.getBoundingClientRect().height), word: cur?.textContent }
      })
      heights.add(st.h)
      seen.add(st.word)
    }
  }
  ok('Rotator visits all 30 destinations', seen.size >= 30, `${seen.size} seen`)
  ok('Headline height never jumps', heights.size === 1, [...heights].join(','))
  await page.close()
}

// 3. ?city= pins one destination and changes the button
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(base + '?city=leavenworth', { waitUntil: 'networkidle' })
  await page.waitForTimeout(3000)
  const word = await page.locator('h1 [aria-hidden] > span > span').last().textContent()
  const btn = await page.locator('#start button[type=submit]').textContent()
  ok('?city= pins the destination', word === 'Leavenworth', word)
  ok('?city= changes the button', /Get my Leavenworth teardown/.test(btn), btn)
  // Success: intercept the form service and check exactly what gets sent.
  let sent = null
  await page.route('https://formsubmit.co/ajax/**', async (route) => {
    sent = { url: route.request().url(), ...JSON.parse(route.request().postData()) }
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":"true","message":"The form was submitted successfully."}' })
  })
  await page.locator('#start input[name=website]').fill('mycabin.com')
  await page.locator('#start select').selectOption('OwnerRez')
  await page.locator('#start input[name=email]').fill('owner@mycabin.com')
  await page.locator('#start button[type=submit]').click()
  const msg = await page.locator('#start [role=status]').textContent({ timeout: 5000 }).catch(() => '')
  ok('Form sends to the inbox', /Bandit's on it/.test(msg) && sent?.Email === 'owner@mycabin.com' && sent?.Website === 'mycabin.com' && sent?.['Booking engine'] === 'OwnerRez' && sent?.['Pinned destination'] === 'Leavenworth' && sent?._replyto === 'owner@mycabin.com', sent ? `to ${sent.url}` : 'nothing sent')
  await page.close()
}

// 3a. Not activated yet: FormSubmit says no, visitor gets the email fallback
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.route('https://formsubmit.co/ajax/**', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":"false","message":"This form needs Activation."}' }))
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.locator('#start input[name=website]').fill('mycabin.com')
  await page.locator('#start select').selectOption('Guesty')
  await page.locator('#start input[name=email]').fill('owner@mycabin.com')
  await page.locator('#start button[type=submit]').click()
  const fallback = await page.locator('#start [role=alert] a').getAttribute('href', { timeout: 5000 }).catch(() => '')
  ok('Unactivated form shows the email fallback', fallback.startsWith('mailto:abhimanyu@lodgepnw.com'), fallback.slice(0, 60))
  await page.close()
}

// 3b. Final form: a failed send shows the email fallback
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.route('https://formsubmit.co/ajax/**', (route) => route.abort())
  await page.goto(base, { waitUntil: 'networkidle' })
  const f = page.locator('#teardown form')
  await f.scrollIntoViewIfNeeded()
  await f.locator('input[name=name]').fill('Pat')
  await f.locator('input[name=email]').fill('pat@cabin.com')
  await f.locator('input[name=website]').fill('cabin.com')
  await f.locator('select').selectOption('Lodgify')
  await f.locator('button[type=submit]').click()
  const href = await f.locator('[role=alert] a').getAttribute('href', { timeout: 5000 }).catch(() => '')
  ok('Failed send offers a pre-filled email', href.startsWith('mailto:abhimanyu@lodgepnw.com') && href.includes('cabin.com') && href.includes('Lodgify'), href.slice(0, 70))
  await page.close()
}

// 4. No sideways scroll at 390px, scrolled through
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(base, { waitUntil: 'networkidle' })
  let worst = 0
  const h = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < h; y += 600) {
    await page.mouse.wheel(0, 600)
    await page.waitForTimeout(120)
    worst = Math.max(worst, await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth))
  }
  ok('No sideways scroll at 390px', worst === 0, `overflow ${worst}px`)
  ok('No page errors on phone', errors.length === 0, errors.join(' | '))
  await page.close()
}

// 5. Every mascot slot renders at its final size
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(base, { waitUntil: 'networkidle' })
  const slots = await page.$$eval('[data-mascot]', (els) => els.map((e) => ({ id: e.dataset.mascot, w: Math.round(e.getBoundingClientRect().width), h: Math.round(e.getBoundingClientRect().height) })))
  const ids = new Set(slots.map((s) => s.id))
  const zero = slots.filter((s) => !s.w || !s.h).map((s) => s.id)
  ok('All 19 mascot slots on the page', ids.size === 19, `${ids.size}: ${[...ids].join(' ')}`)
  ok('No mascot slot collapsed to zero', zero.length === 0, zero.join(' '))
  await page.close()
}

await browser.close()
console.log(results.join('\n'))

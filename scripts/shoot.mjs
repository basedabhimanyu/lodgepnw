// Dev check: viewport-by-viewport screenshots at desktop and phone width, console errors and sideways overflow.
import { chromium } from 'playwright-core'
const exe = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
const url = process.argv[2] ?? 'http://localhost:5173/'
const tag = process.argv[3] ?? 'pass'
const only = process.argv[4]
const browser = await chromium.launch({ executablePath: exe })
for (const [name, viewport] of [['desktop', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }], ['small', { width: 360, height: 740 }]]) {
  if (only && only !== name) continue
  const page = await browser.newPage({ viewport, deviceScaleFactor: name === 'desktop' ? 1 : 2, hasTouch: name !== 'desktop', isMobile: name !== 'desktop', reducedMotion: process.env.REDUCED ? 'reduce' : 'no-preference' })
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const h = await page.evaluate(() => document.documentElement.scrollHeight)
  let i = 0
  for (let y = 0; y < h; y += viewport.height) {
    await page.evaluate((y) => window.scrollTo(0, y), y)
    await page.mouse.wheel(0, 1)
    await page.waitForTimeout(Number(process.env.WAIT ?? 900))
    await page.screenshot({ path: `shots/${tag}-${name}-${String(i++).padStart(2, '0')}.png` })
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  console.log(name, 'height', h, 'shots', i, 'overflowX', overflow, 'errors', errors.length ? errors : 'none')
  await page.close()
}
await browser.close()

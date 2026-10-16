import { chromium } from 'playwright-core'
const exe = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
const browser = await chromium.launch({ executablePath: exe })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.evaluate(() => window.scrollTo(0, document.querySelector('#leaks').offsetTop + 200))
await page.waitForTimeout(1500)
const card = page.locator('[data-leak]').nth(5)
await card.hover()
for (let t = 0; t <= 2400; t += 300) {
  const st = await card.evaluate((c) => ({
    target: getComputedStyle(c.querySelector('[data-leak-target]')).opacity,
    fixed: getComputedStyle(c.querySelector('[data-leak-fixed]')).opacity,
    stamp: getComputedStyle(c.querySelector('[data-fixed]')).opacity,
    flyers: document.querySelectorAll('body > svg > g').length,
  }))
  console.log(t, JSON.stringify(st))
  if (t === 600) await page.screenshot({ path: 'shots/swipe-mid.png' })
  await page.waitForTimeout(300)
}
await page.screenshot({ path: 'shots/swipe-after.png' })
await browser.close()

import { chromium } from 'playwright-core'
const exe = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
const browser = await chromium.launch({ executablePath: exe })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
const el = await page.evaluate(() => { const s = document.querySelector('#how'); const r = s.getBoundingClientRect(); return { top: r.top + scrollY, h: r.height } })
for (const extra of [300, 700]) {
  await page.evaluate((y) => window.scrollTo(0, y), el.top + el.h - 900 + extra)
  await page.waitForTimeout(1000)
  await page.screenshot({ path: `shots/pin-${extra}.png` })
}
await browser.close()

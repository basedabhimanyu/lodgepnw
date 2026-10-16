import { chromium } from 'playwright-core'
const exe = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
const browser = await chromium.launch({ executablePath: exe })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.evaluate(() => window.scrollTo(0, document.querySelector('#leaks').offsetTop + 120))
await page.waitForTimeout(1500)
const card = page.locator('[data-leak="slow-replies"]')
await card.hover()
await page.waitForTimeout(250)
await page.screenshot({ path: 'shots/cast-mid.png' })
await page.waitForTimeout(1200)
await page.screenshot({ path: 'shots/cast-after.png' })
// folio pinned mid-way
const top = await page.evaluate(() => document.querySelector('#how').getBoundingClientRect().top + window.scrollY)
await page.evaluate((y) => window.scrollTo(0, y + 700), top)
await page.waitForTimeout(1200)
await page.screenshot({ path: 'shots/folio-pinned.png' })
await browser.close()

import { chromium } from 'playwright-core'
const exe = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
const browser = await chromium.launch({ executablePath: exe })
const page = await browser.newPage({ viewport: { width: 1500, height: 900 }, deviceScaleFactor: 1 })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
await page.goto('http://localhost:5173/lab.html', { waitUntil: 'networkidle' })
await page.waitForTimeout(Number(process.argv[3] ?? 600))
await page.screenshot({ path: `shots/${process.argv[2] ?? 'lab'}.png`, fullPage: true })
console.log('errors', errors.length ? errors : 'none')
await browser.close()

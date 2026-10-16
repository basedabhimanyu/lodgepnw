// Sends one real teardown request from the live form and prints FormSubmit's reply.
import { chromium } from 'playwright-core'
const exe = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
const browser = await chromium.launch({ executablePath: exe })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('https://www.lodgepnw.com/', { waitUntil: 'networkidle' })
const reply = page.waitForResponse((r) => r.url().startsWith('https://formsubmit.co/ajax/'), { timeout: 20000 })
await page.locator('#start input[name=website]').fill(process.argv[2] ?? 'test-from-claude.example')
await page.locator('#start select').selectOption('Other / none')
await page.locator('#start input[name=email]').fill('abhimanyu@lodgepnw.com')
await page.locator('#start button[type=submit]').click()
const r = await reply
console.log('status', r.status(), await r.text())
await page.waitForTimeout(1000)
console.log('page shows:', (await page.locator('#start').innerText()).split('\n').slice(-2).join(' | '))
await browser.close()

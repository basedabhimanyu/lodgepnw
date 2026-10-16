import { chromium } from 'playwright-core'
const exe = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
const browser = await chromium.launch({ executablePath: exe })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.locator('#plans').scrollIntoViewIfNeeded(); await page.waitForTimeout(2500)
console.log(await page.evaluate(() => {
  const r = (el) => { const b = el.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.right), Math.round(b.top), Math.round(b.bottom)] }
  const lean = document.querySelector('[data-mascot="plans-lean"]')
  const cards = [...document.querySelectorAll('[data-swing]')]
  return { lean: r(lean), wrap: r(lean.parentElement), cards: cards.map(r), tf: cards.map(c => getComputedStyle(c).transform) }
}))
await page.screenshot({ path: 'shots/plans-fixed.png' })
await browser.close()

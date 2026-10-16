import { chromium } from 'playwright-core'
const exe = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
const browser = await chromium.launch({ executablePath: exe })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(process.argv[2] ?? 'http://localhost:5173/', { waitUntil: 'networkidle' })
for (let t = 0; t < 8; t++) {
  const s = await page.evaluate(() => {
    const h1 = document.querySelector('h1 [aria-hidden] > span')
    const spans = [...h1.querySelectorAll(':scope > span')].map((e) => `${e.textContent}|op=${getComputedStyle(e).opacity}|tf=${e.style.transform}`)
    return { box: h1.style.width, w: h1.getBoundingClientRect().width, spans, top: document.querySelector('.bg-fir .text-lichen')?.textContent, brush: h1.querySelector('[data-brush]').style.strokeDashoffset }
  })
  console.log(t * 700, JSON.stringify(s))
  await page.waitForTimeout(700)
}
await browser.close()

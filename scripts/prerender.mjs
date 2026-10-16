// Injects the server-rendered page into dist/index.html so crawlers see every word without JavaScript.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const file = resolve(root, 'dist/index.html')
const html = readFileSync(file, 'utf8')
if (!html.includes('<!--app-html-->')) throw new Error('dist/index.html is missing the <!--app-html--> marker')
writeFileSync(file, html.replace('<!--app-html-->', render()))
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('Pre-rendered dist/index.html')

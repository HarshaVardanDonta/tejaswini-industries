/**
 * Writes one HTML file per public route so crawlers receive full content,
 * a unique title, description, canonical and JSON-LD without running JavaScript.
 * Content edits in Firestore show up in this HTML on the next static deploy.
 * There is no runtime server and no deploy hook.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const { render, prerenderPaths } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)

const template = readFileSync(join(root, 'dist/index.html'), 'utf8')
const siteUrl = (process.env.VITE_SITE_URL || 'https://www.tejaswiniindustries.com').replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

if (!template.includes('<!--app-head-->')) {
  throw new Error('dist/index.html is missing <!--app-head-->')
}

function adminHead(route) {
  const canonical = `${siteUrl}${route}`
  return `<title>Admin | Tejaswini Industries</title>
    <meta name="description" content="Private content admin." />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="canonical" href="${canonical}" />`
}

for (const route of prerenderPaths) {
  const adminRoute = route === '/admin' || route.startsWith('/admin/')
  const rendered = adminRoute ? null : render(route)
  const head = adminRoute ? adminHead(route) : rendered.head
  const body = adminRoute
    ? '<main class="min-h-screen flex items-center justify-center"><h1>Admin</h1></main>'
    : rendered.html
  const page = template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  const relative = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`
  const file = join(root, 'dist', relative)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page)
  console.log('  prerendered', route)
}

const urls = prerenderPaths
  .filter((route) => !route.startsWith('/admin'))
  .map((route) => ({
    loc: `${siteUrl}${route === '/' ? '/' : route}`,
    lastmod: today,
    changefreq: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? '1.0' : route.startsWith('/products') ? '0.9' : '0.7',
  }))

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync(join(root, 'dist/sitemap.xml'), sitemap)
writeFileSync(join(root, 'public/sitemap.xml'), sitemap)
console.log(`Prerendered ${prerenderPaths.length} routes.` )

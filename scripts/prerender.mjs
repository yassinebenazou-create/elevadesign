import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const rootDir = resolve(import.meta.dirname, '..')
const distDir = join(rootDir, 'dist')
const serverEntry = join(rootDir, 'dist-ssr', 'entry-server.js')
const templatePath = join(distDir, 'index.html')
const siteUrl = 'https://www.elevadesign.ma'

const template = readFileSync(templatePath, 'utf8')
const server = await import(pathToFileURL(serverEntry).href)
const routes = server.getSitemapRoutes()
const routesToRender = [...routes, server.notFoundRouteSeo]

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function absoluteUrl(pathOrUrl) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  return `${siteUrl}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`
}

function serializeJsonLd(jsonLd) {
  return JSON.stringify(jsonLd).replaceAll('<', '\\u003c')
}

function buildHead(route) {
  const canonicalUrl = absoluteUrl(route.canonicalPath)
  const imageUrl = absoluteUrl(route.image ?? '/images/hero/hero-01.jpg')
  const robots = route.robots ?? 'index, follow'
  const type = route.type ?? 'website'
  const jsonLd = route.jsonLd
    ? `\n    <script type="application/ld+json" data-seo="managed">${serializeJsonLd(route.jsonLd)}</script>`
    : ''

  return [
    `    <title>${escapeHtml(route.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(route.description)}" data-seo="managed" />`,
    `    <meta name="robots" content="${escapeHtml(robots)}" data-seo="managed" />`,
    `    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" data-seo="managed" />`,
    `    <meta property="og:type" content="${escapeHtml(type)}" data-seo="managed" />`,
    '    <meta property="og:locale" content="fr_FR" data-seo="managed" />',
    '    <meta property="og:site_name" content="Eleva Design" data-seo="managed" />',
    `    <meta property="og:title" content="${escapeHtml(route.title)}" data-seo="managed" />`,
    `    <meta property="og:description" content="${escapeHtml(route.description)}" data-seo="managed" />`,
    `    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" data-seo="managed" />`,
    `    <meta property="og:image" content="${escapeHtml(imageUrl)}" data-seo="managed" />`,
    '    <meta name="twitter:card" content="summary_large_image" data-seo="managed" />',
    `    <meta name="twitter:title" content="${escapeHtml(route.title)}" data-seo="managed" />`,
    `    <meta name="twitter:description" content="${escapeHtml(route.description)}" data-seo="managed" />`,
    `    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" data-seo="managed" />${jsonLd}`,
  ].join('\n')
}

function outputPathForRoute(path) {
  if (path === '/') return join(distDir, 'index.html')
  if (path === '/404') return join(distDir, '404.html')
  return join(distDir, path.replace(/^\//, ''), 'index.html')
}

function publicOutputPathForRoute(path) {
  if (path === '/') return '/index.html'
  if (path === '/404') return '/404.html'
  return `${path}/index.html`
}

function renderRoute(route) {
  const appHtml = server.render(route.path)
  const html = template
    .replace(/<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/, buildHead(route))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  const filePath = outputPathForRoute(route.path)

  mkdirSync(dirname(filePath), { recursive: true })
  writeFileSync(filePath, html)
}

function buildSitemapXml() {
  const urls = routes
    .map((route) => {
      const loc = absoluteUrl(route.canonicalPath)
      return `  <url><loc>${loc}</loc><priority>${route.priority.toFixed(2)}</priority></url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function buildRedirects() {
  const rules = routes
    .filter((route) => route.path !== '/')
    .flatMap((route) => [
      `${route.path} ${publicOutputPathForRoute(route.path)} 200`,
      `${route.path}/ ${publicOutputPathForRoute(route.path)} 200`,
    ])

  return `${rules.join('\n')}\n/* /404.html 404\n`
}

for (const route of routesToRender) {
  renderRoute(route)
}

const sitemapXml = buildSitemapXml()
writeFileSync(join(distDir, 'sitemap.xml'), sitemapXml)
writeFileSync(join(rootDir, 'public', 'sitemap.xml'), sitemapXml)
writeFileSync(join(distDir, '_redirects'), buildRedirects())
rmSync(join(rootDir, 'dist-ssr'), { recursive: true, force: true })

console.log(`Prerendered ${routesToRender.length} routes and generated sitemap.xml`)

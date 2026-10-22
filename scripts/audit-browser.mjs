// Run against `wrangler pages dev dist --port 8788` with Playwright installed.
// Optional: AUDIT_BASE_URL, AUDIT_OUTPUT_DIR, PLAYWRIGHT_MODULE, CHROME_PATH.
import assert from 'node:assert/strict'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:8788'
const output = process.env.AUDIT_OUTPUT_DIR
if (output) mkdirSync(output, { recursive: true })
const paths = [...readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)]
  .map(match => new URL(match[1]).pathname)
const results = []
const keyPaths = ['/', '/contact/', '/services/architecture-interieure/', '/projets/villa-h2/',
  '/services/habillage-mural/', '/services/dressing-sur-mesure/', '/services/cuisine-sur-mesure/']
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined })
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 3 })
  const page = await context.newPage()
  page.setDefaultTimeout(15000)
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.addInitScript(() => {
    window.open = (...args) => { window.auditOpened = args; return null }
    window.auditInteractions = []
    new PerformanceObserver(list => {
      for (const event of list.getEntries()) {
        if (event.interactionId) window.auditInteractions.push(event.duration)
      }
    }).observe({ type: 'event', buffered: true, durationThreshold: 16 })
  })
  // Use direct HTTP fetches for every route, including Cloudflare's status behavior.
  for (const path of paths) {
    const response = await context.request.get(base + path)
    assert.equal(response.status(), 200, path)
    assert.ok(!response.headers()['x-robots-tag']?.includes('noindex'), path)
    const html = await response.text()
    assert.ok(html.includes(`href="https://elevadesign.ma${path}"`), path)
    assert.ok(html.includes('<div id="root"><'), path)
    if (path !== '/') {
      const legacyPath = path.replace(/\/$/, '')
      const legacy = await context.request.get(base + legacyPath, { maxRedirects: 0 })
      assert.ok([301, 302, 307, 308].includes(legacy.status()), legacyPath)
      assert.equal(new URL(legacy.headers().location, base).pathname, path)
    }
  }
  results.push(`${paths.length} preferred trailing-slash routes return 200; ${paths.length - 1} legacy variants redirect to them`)
  const queryResponse = await context.request.get(base + '/contact/?utm_source=audit&ref=one%20two')
  assert.equal(queryResponse.status(), 200)
  assert.match(await queryResponse.text(), /href="https:\/\/elevadesign.ma\/contact\/"/)
  for (const path of ['/missing-audit-page', '/services/missing-audit-page', '/projets/missing-audit-page']) {
    const response = await context.request.get(base + path)
    assert.equal(response.status(), 404, path)
    assert.match(await response.text(), /noindex, follow/)
  }
  results.push('Unknown general, project and service URLs return HTTP 404 with noindex')
  for (const path of paths) {
    await page.goto(base + path, { waitUntil: 'domcontentloaded' })
    await page.waitForFunction(() => document.querySelector('main h1'))
    assert.equal(await page.locator('h1').count(), 1, path)
    assert.equal(await page.locator('link[rel="canonical"]').count(), 1, path)
    assert.equal(await page.locator('script[type="application/ld+json"]').count(), 1, path)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Mobile overflow: ${path}`)
  }
  results.push(`All ${paths.length} routes hydrate on mobile with one H1, canonical and JSON-LD block; no horizontal overflow`)
  for (const path of ['/services/habillage-mural/', '/services/dressing-sur-mesure/', '/services/cuisine-sur-mesure/', '/projets/villa-h2/']) {
    await page.goto(base + path)
    await page.locator('.responsive-picture img').first().waitFor()
    assert.match(await page.locator('.responsive-picture img').first().evaluate(image => image.currentSrc), /\.avif$/)
  }
  results.push('New service and project pages select responsive AVIF display images')
  await page.goto(base + '/contact/')
  const form = page.locator('.contact-form')
  const submit = form.locator('button[type="submit"]')
  const dropdown = page.locator('#projectTypeButton')
  const alert = form.getByRole('alert')
  const option = name => form.getByRole('checkbox', { name, exact: true })
  await page.locator('#name').fill('Audit test')
  await page.locator('#message').fill('Projet test & détails')
  await submit.click()
  assert.equal(await page.locator('#phone').evaluate(input => input.validity.valueMissing), true)
  assert.equal(await page.evaluate(() => window.auditOpened), undefined)
  for (const phone of ['abc', '123', '   ', '1234567890123456']) {
    await page.locator('#phone').fill(phone)
    assert.equal(await page.locator('#phone').evaluate(input => input.checkValidity()), false, phone)
  }
  for (const phone of ['0613790624', '+212 613 790 624', '06-13-79-06-24', '+33 6 12 34 56 78']) {
    await page.locator('#phone').fill(phone)
    assert.equal(await page.locator('#phone').evaluate(input => input.checkValidity()), true, phone)
  }
  await submit.click()
  await alert.waitFor()
  await option('Salon').check()
  assert.equal(await alert.count(), 0)
  assert.equal(await dropdown.getAttribute('aria-invalid'), null)
  await option('Cuisine').check()
  await dropdown.click()
  assert.deepEqual(await form.evaluate(el => new FormData(el).getAll('projectTypes')), ['Salon', 'Cuisine'])
  await submit.click()
  let opened = await page.evaluate(() => window.auditOpened)
  assert.equal(new URL(opened[0]).pathname, '/212613790624')
  assert.match(new URL(opened[0]).searchParams.get('text'), /Salon, Cuisine/)
  assert.match(new URL(opened[0]).searchParams.get('text'), /Projet test & détails/)
  await dropdown.click()
  await option('Salon').uncheck()
  assert.equal(await alert.count(), 0)
  await option('Cuisine').uncheck()
  await alert.waitFor()
  await option('Autre').check()
  assert.equal(await alert.count(), 0)
  await dropdown.click()
  assert.equal(await page.locator('#otherProjectType').evaluate(input => input.checkValidity()), false)
  await page.locator('#otherProjectType').fill('Showroom')
  await submit.click()
  opened = await page.evaluate(() => window.auditOpened)
  assert.match(new URL(opened[0]).searchParams.get('text'), /Autre \(Showroom\)/)
  results.push('Phone required/format, empty dropdown, multi-select persistence, last-option removal, Other required field and encoded WhatsApp payload pass; no message sent')
  results.push(`Contact interaction durations: ${JSON.stringify(await page.evaluate(() => window.auditInteractions))} ms (unthrottled lab sample, not field INP)`)
  await page.getByRole('button', { name: 'Ouvrir le menu', exact: true }).click()
  assert.equal(await page.locator('#mobile-nav').getAttribute('aria-hidden'), 'false')
  await page.locator('#mobile-nav').getByRole('link', { name: 'Services', exact: true }).click()
  await page.waitForURL('**/services/')
  assert.equal(await page.locator('#mobile-nav').getAttribute('aria-hidden'), 'true')
  assert.equal(await page.locator('#mobile-nav').evaluate(el => el.inert), true)
  results.push('Mobile navigation opens, navigates and closes; hidden navigation is inert')
  // Regression: initial browser content must match French SSR, even with saved English.
  await page.evaluate(() => localStorage.setItem('eleva-language', 'en'))
  await page.goto(base + '/contact/')
  await page.waitForFunction(() => document.documentElement.lang === 'en')
  assert.match(await page.locator('h1').innerText(), /Project/)
  await page.getByRole('button', { name: 'Ouvrir le menu', exact: true }).click()
  await page.locator('#mobile-nav').getByRole('link', { name: 'Services', exact: true }).click()
  await page.waitForURL('**/services/')
  assert.equal(await page.locator('html').getAttribute('lang'), 'en')
  results.push('Saved English hydrates without mismatch and lang remains en after client navigation')
  const interactions = await page.evaluate(() => window.auditInteractions)
  results.push(`Observed interaction event durations on final mobile page: ${JSON.stringify(interactions)} ms (lab sample, not field INP)`)
  await page.evaluate(() => localStorage.setItem('eleva-language', 'fr'))
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of keyPaths) {
      await page.goto(base + path)
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width}px ${path}`)
    }
  }
  results.push('Home, contact, existing/new service and project layouts fit 320/390/768/1440px viewports')
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(base + '/projets/villa-h2/')
  await page.locator('.project-gallery button').first().click()
  await page.getByRole('dialog').waitFor()
  await page.keyboard.press('Escape')
  assert.equal(await page.getByRole('dialog').count(), 0)
  results.push('Project lightbox opens and Escape closes it')
  await page.goto(base + '/')
  await page.locator('.hero-slider__controls button').last().click()
  await page.waitForFunction(() => document.querySelectorAll('.hero-slider__indicators [aria-current="true"]')[0] === document.querySelectorAll('.hero-slider__indicators button')[1])
  results.push('Hero slider controls advance slides')
  if (output) {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 844 })
      for (const path of keyPaths) {
        await page.goto(base + path)
        await page.evaluate(() => document.fonts.ready)
        await page.waitForTimeout(1800)
        await page.screenshot({ path: join(output, `${width}-${path.replaceAll('/', '_') || 'home'}.png`) })
      }
    }
  }
  assert.deepEqual(errors, [], 'Browser runtime/hydration errors')
  results.push('No browser runtime or hydration errors across the tested routes and interactions')
  console.log(results.join('\n'))
  if (output) writeFileSync(join(output, 'browser-results.json'), JSON.stringify(results, null, 2))
} finally {
  await browser.close()
}

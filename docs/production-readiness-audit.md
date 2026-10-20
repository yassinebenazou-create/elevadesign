# Eleva Design — production readiness and technical SEO audit

Audit date: 20 October 2026. Preferred origin: **https://elevadesign.ma**.

**Status: code corrections are ready for review; domain launch is not yet cleared.** The apex and www hosts resolved to `169.50.173.20`, but HTTPS connections were refused from the audit environment. The existing `https://elevadesign.pages.dev` site responded successfully. DNS, TLS, the eventual production deployment and real-user performance still require launch verification.

No deployment, push, Cloudflare dashboard change, or domain redirect activation was performed during this audit. The working tree was clean at the beginning. Existing visual styles and animation timings were preserved; `src/index.css` was not edited.

## Checks passed

| Area | Result |
| --- | --- |
| Route coverage | 35 public pages: 6 main pages, 6 service landing pages, 23 project pages; a separate 404 document |
| Static rendering | All 35 public routes contain meaningful main content without executing JavaScript |
| Metadata | Unique titles and descriptions; one canonical, description and robots directive per document; matching Open Graph and Twitter metadata |
| Heading structure | One H1 per route; H2 sections and subordinate content are present; no heading-order issue in the home Lighthouse audit |
| Canonical origin | Canonicals, social URLs/images, sitemap and JSON-LD use `https://elevadesign.ma` |
| Sitemap | 35 unique valid public URLs; no 404, invalid project/service slug, query URL or non-public route |
| Robots | `User-agent: *` and `Allow: /`; production sitemap URL; public HTML has `index, follow` |
| 404 behavior | Cloudflare local runtime returns HTTP 404 plus `noindex, follow` for unknown general, project and service routes |
| Links and assets | No broken local links, image sources/srcsets, stylesheet assets, scripts or social preview images in the generated site |
| Image alternatives | All static images have alt attributes; empty alternatives are explicitly decorative |
| Duplicate content | No identical titles, descriptions or complete main-content text across public routes; shared navigation and service templates are expected |
| Structured data | JSON parsing, node types, property fixes, breadcrumb positions, origin consistency and FAQ-to-visible-text checks pass; one managed JSON-LD block per public route |
| Contact | Empty/invalid phone rejected; valid domestic/international formats accepted; dropdown errors clear immediately; selections persist when closed; Other details required; encoded WhatsApp payload verified |
| Mobile | All routes checked at 390px; key routes also checked at 320, 768 and 1440px; no horizontal document overflow |
| Interaction | Mobile menu, language persistence, hero slider and project lightbox pass; no runtime or hydration errors in the browser suite |
| Live preview | All 35 public routes returned HTTP 200; tested invalid route returned 404; robots and sitemap reachable |
| Dependencies | Updated lockfile passes `npm audit` with zero known vulnerabilities; clean install and production build succeed |

Metadata and content checks distinguish exact duplicates from editorial similarity. They are not a search-ranking prediction. External Instagram content is supplied by a third party and is not part of the static internal-link/image inventory.

## Confirmed problems fixed

1. **Wrong preferred host.** Existing SEO URLs used `www.elevadesign.ma`. Updated to the requested apex host and made the prerenderer read `seoConfig.siteUrl` instead of keeping a second hardcoded origin. Build-time robots generation uses the same configuration.
2. **Invalid Cloudflare routing rules.** The local Pages runtime rejected 34 trailing-slash rewrites as loops and rejected the catch-all status `404`. Removed those rules. Valid extensionless internal rewrites remain; Pages serves directory indexes and the top-level `404.html` natively. All 35 routes, 34 trailing-slash variants and three invalid-route cases were tested.
3. **Structured-data vocabulary and entity duplication.** Removed deprecated `ProfessionalService`, the incorrectly placed `serviceType`, and duplicate home business entities. The business has one stable Organization ID and service providers reference it. LocalBusiness is conditional on a verified address; the current placeholder is excluded. Project `contentLocation` now uses a Place object, and year-only project dates use `temporalCoverage` instead of claiming an exact creation date. [Schema.org ProfessionalService](https://schema.org/ProfessionalService), [serviceType](https://schema.org/serviceType), [contentLocation](https://schema.org/contentLocation).
4. **Returning-visitor hydration failure.** A stored English preference caused React error #418 because the browser's first render disagreed with French prerendered HTML. `useSyncExternalStore` now supplies the French hydration snapshot and then restores the browser preference. Removed the SEO effect that reset the HTML language to French on route navigation. Storage failures retain an in-memory preference.
5. **Unnecessary image transfers.** Removed the global home-hero preload from every route. Added responsive AVIF/WebP hero variants and responsive lossless WebP logo/WhatsApp variants. Originals are retained. Full-resolution brand conversions were checked for identical decoded pixels; resized derivatives use Lanczos, and hero derivatives use high-quality encoding. Hidden carousel image requests start after the first image loads. Offscreen gallery and about-page images load lazily.
6. **Unnecessary initial JavaScript.** The interactive lightbox and Instagram widget now load on demand, while meaningful prerendered page text remains intact. The final initial JS bundle is 484.44 kB / 149.49 kB gzip, versus 523.98 kB / 161.33 kB gzip in the baseline build.
7. **Phone input and accessibility.** Required phone input now uses `type="tel"`, autofill and a 7–15 digit format rule allowing an international prefix and common separators. Linked dropdown error text with `aria-describedby`. Hidden mobile navigation is inert. The Instagram link's accessible name now includes its visible handle, correcting the Lighthouse label/name mismatch.
8. **Stale dependency lockfile.** The lockfile still pinned vulnerable Vite/source-map-js versions despite patched versions being installed locally. Updated to Vite 8.3.4 and source-map-js 1.2.2, with the corresponding build-tool dependencies. A clean install verified the resulting lockfile.

No business address, geographic coordinates, opening hours, reviews, ratings, prices or awards were invented. Existing project facts and page copy were preserved. LocalBusiness rich-result eligibility is **not** claimed without verified business address data. [Google LocalBusiness requirements](https://developers.google.com/search/docs/appearance/structured-data/local-business).

## Performance and remaining limitations

<!-- performance-results -->

These are single-run Lighthouse mobile lab measurements against the local production build, using Lighthouse's default simulated mobile throttling. They are not production network measurements or field Core Web Vitals. Results vary with the host machine, external fonts and browser scheduling. The browser suite also samples interaction durations, but these are **not field INP**. After launch, assess LCP, CLS and INP at the 75th percentile through PageSpeed Insights/Search Console or real-user measurement. [Web Vitals](https://web.dev/articles/vitals).

Remaining issues for review:

- The new apex/www domain does not yet serve usable HTTPS from the test environment. This blocks domain migration approval.
- Mobile performance needs further work; the home hero remains substantial at high pixel densities, and several full-resolution project photos exceed 4 MB (largest approximately 6.3 MB). Original portfolio imagery was retained to protect full-screen viewing quality. A further responsive-gallery pass should be reviewed visually.
- Google Fonts CSS remains render blocking (about 0.9 seconds estimated opportunity in the first post-fix home run). Fonts already use `display=swap` and preconnect. Self-hosting the same fonts is a possible next optimization; this audit does not replace typography or remove animations to inflate a score.
- Gold text on ivory backgrounds has insufficient contrast in Lighthouse (for example, approximately 2.79:1 on home eyebrow/project metadata). Resolving it requires a color/design decision, so the existing palette was preserved.
- Eight metadata-length advisories remain: five titles over 65 characters and three descriptions over 170. These are truncation risks, not invalid metadata; unique existing copy was retained.
- French is the indexable language. Other languages are browser preferences on the same URLs; some service/project content remains French. No alternate-language URLs exist, so no invented `hreflang` alternates were added.
- The realisations introduction and links are static, but the Instagram gallery depends on Simpleembed/Instagram and client JavaScript. Its availability, quotas and embedded playback require a normal-browser check before launch.
- Contact opens a prefilled WhatsApp conversation; it does not submit to a database/email backend or send a message automatically. Tests intercepted `window.open`; no customer message was sent. Confirm receipt manually on the actual business phone.
- Schema checks are programmatic and based on the schema vocabulary. Run Google Rich Results Test and Schema.org Validator on the final HTTPS URLs after deployment; rich-result display is not guaranteed, including FAQ markup.

## Tests executed

- Baseline production build and generated-HTML inventory before application changes.
- `npm ci --ignore-scripts`: passed after stopping the local preview process that held a Windows native-module file lock.
- `npm run build`: TypeScript, client bundle, SSR bundle, 36 prerendered documents and sitemap generation passed on the clean install.
- `npm run lint`: passed with four pre-existing warnings (Fast Refresh exports in Seo/I18nProvider; effect-state warnings in Header/usePrefersReducedMotion).
- `npm audit`: zero known vulnerabilities after lockfile correction.
- `python scripts/audit-production.py`: 35 public routes, zero errors, eight advisory metadata-length warnings. Checks include assets/srcsets, metadata uniqueness, schema, sitemap, robots and inactive domain redirects.
- `node scripts/audit-browser.mjs` against `wrangler pages dev dist --port 8788`: direct HTTP route/status checks, all-route mobile hydration, contact/WhatsApp cases, saved-language navigation, viewport checks, lightbox and slider passed. Screenshots were captured at mobile and desktop sizes and inspected.
- Read-only live-preview HTTP crawl: 35/35 public pages returned 200. The preview still has the old www SEO origin because these changes have not been deployed.
- Read-only DNS/HTTPS checks: apex/www resolve but HTTPS connection refused; production TLS and redirects cannot yet be accepted.
- Lighthouse mobile baseline plus final home/contact/service/project runs; results above.

The automated results and route inventory are in `audit-results.json`. Screenshot and full Lighthouse JSON artifacts from this run are in `%TEMP%\eleva-audit` on this workstation.

To repeat the source-independent checks after building:

```powershell
python scripts/audit-production.py
npx wrangler pages dev dist --port 8788
```

In a second terminal, run `node scripts/audit-browser.mjs` with Playwright available. The script supports `PLAYWRIGHT_MODULE` (module name or file URL), `CHROME_PATH` (browser executable), `AUDIT_BASE_URL` (defaults to localhost:8788), and `AUDIT_OUTPUT_DIR`. These optional test tools are not runtime dependencies. Image regeneration is optional with `python scripts/optimize-images.py` and Pillow with AVIF support; generated assets are already included.

## Files modified

| Files | Purpose |
| --- | --- |
| `src/config/seo.ts`, `src/entry-server.tsx`, `scripts/prerender.mjs`, `index.html` | Preferred apex origin, shared build configuration, preload/routing corrections |
| `public/robots.txt`, `public/sitemap.xml`, `public/_redirects` | Production crawl URLs and valid Cloudflare routing |
| `src/utils/structuredData.ts`, `src/seo/routeSeo.ts` | Correct vocabulary, business identity and project location/year types |
| `src/i18n/I18nProvider.tsx`, `src/components/Seo.tsx` | Hydration-safe language state and correct document language |
| `src/config/site.ts`, `src/components/Header.tsx`, `Footer.tsx`, `MobileNavigation.tsx`, `WhatsAppFloat.tsx`, `HeroSlider.tsx`, `SocialLinks.tsx` | Responsive asset delivery, hidden-navigation accessibility and matching Instagram label |
| `src/components/ProjectGallery.tsx`, `src/pages/AboutPage.tsx`, `src/pages/RealisationsPage.tsx` | Deferred below-fold images and on-demand interactive code |
| `src/pages/ContactPage.tsx` | Phone validation and accessible dropdown error association |
| `package-lock.json`, `.gitignore` | Patched reproducible dependencies; ignore local Wrangler state |
| Seven new `public/images/brand/*.webp` files | Logo and WhatsApp full-resolution/width variants |
| Six new `public/images/hero/hero-01-{960,1920,2880}.{webp,avif}` files | Responsive first-slide assets; original JPEG retained |
| `scripts/audit-production.py`, `scripts/audit-browser.mjs`, `scripts/optimize-images.py` | Repeatable validation and asset generation |
| `docs/production-readiness-audit.md`, `docs/audit-results.json` | Review report and test evidence |

## Remaining manual Cloudflare actions — after review

1. Confirm that the intended Pages project serves `elevadesign.pages.dev`; retain build command `npm run build` and output directory `dist`. Use a compatible Node version (this audit used Node 22.20.0). Deploy reviewed changes only after approval.
2. Add `elevadesign.ma` to that project's Custom domains. For an apex Pages domain, configure the Cloudflare zone/nameservers and verify the resulting DNS mapping. Preserve unrelated mail/DNS records. Wait for the domain to become active and receive a valid certificate. [Cloudflare custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).
3. Before enabling redirects, verify `https://elevadesign.ma/`, `/contact`, all sitemap routes, assets, robots, sitemap, one unknown URL, and the form. Check there is no Cloudflare Access/challenge or `X-Robots-Tag: noindex` on public production responses. Verify Googlebot access under the actual WAF/bot rules; source robots.txt alone cannot establish this.
4. Set up HTTPS for `www.elevadesign.ma`, then enable permanent redirects to the apex. Use the following **planned, currently inactive** Bulk Redirect entries:

| Source URL | Target URL | Status |
| --- | --- | --- |
| `elevadesign.pages.dev/` | `https://elevadesign.ma/` | 301 |
| `www.elevadesign.ma/` | `https://elevadesign.ma/` | 301 |
| `http://elevadesign.ma/` | `https://elevadesign.ma/` | 301 |

For each entry, enable **Subpath matching**, **Preserve path suffix** and **Preserve query string**. Omitting the source scheme covers both HTTP and HTTPS. Keep **Include subdomains** off unless you deliberately want branch/deployment preview hosts redirected too; alternatively protect those previews separately. Do not redirect unrelated subdomains. [Cloudflare Pages domain redirects](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/), [redirect parameters](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/parameters/).

5. Test an exact path-and-query example: `https://elevadesign.pages.dev/projets/villa-h2?utm_source=instagram&ref=one%20two` must redirect to `https://elevadesign.ma/projets/villa-h2?utm_source=instagram&ref=one%20two` with 301, then return 200. Test www, HTTP apex, an encoded query and an invalid path (ending in a real 404). Avoid loops and homepage-only redirects. If HTTPS fails, leave migration redirects disabled.

## Remaining manual Google Search Console actions

1. Verify the `elevadesign.ma` Domain property with DNS. If the pages.dev host has been indexed, verify its URL-prefix property too and review existing indexed URLs/backlinks.
2. Once production and redirects are verified, submit `https://elevadesign.ma/sitemap.xml` and inspect the home, contact, a service and a project URL. Confirm the rendered HTML, crawl access and Google-selected canonical match the intended pages.
3. For an indexed pages.dev-to-custom-domain migration, use Change of Address if the verified properties are eligible. It is not required merely for HTTP-to-HTTPS or www-to-apex normalization.
4. Monitor Pages indexing, crawl failures, canonical selection, structured-data issues and Core Web Vitals. Re-run PageSpeed Insights against the production domain after real traffic becomes available. Retain migration redirects for at least a year, ideally longer. [Google site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

# Eleva Design — final deployment readiness report

Final review: **22 October 2026**. Preferred origin: **https://elevadesign.ma/**.

**Decision: the production candidate passes the route, SEO, functionality, responsive-layout and WCAG AA contrast checks. Mobile LCP remains a performance risk to monitor after launch.** Deployment status and the exact commit hash are reported separately after the Git-connected Cloudflare Pages deployment completes.

## Final production output

- 38 public routes: 6 main pages, 9 service pages and 23 project pages.
- 39 prerendered HTML documents including the standalone 404 page.
- All preferred public URLs use a trailing slash because Cloudflare Pages serves the directory form directly. The 37 non-root legacy variants redirect once to that preferred form.
- Canonical URLs, Open Graph URLs, sitemap URLs, internal navigation and page URLs in JSON-LD use `https://elevadesign.ma/` and the preferred trailing-slash path.
- `/services/habillage-mural/`, `/services/dressing-sur-mesure/` and `/services/cuisine-sur-mesure/` are included in prerendering, the sitemap, internal service/project links and structured data.
- Casablanca is the primary commercial location in the three new pages. Nationwide Morocco coverage remains explicit. No address, showroom, rating, review, price, deadline or project fact was invented.

## Mobile performance work completed

- Self-hosted the existing Cormorant and Raleway fonts and removed the render-blocking Google Fonts stylesheet.
- Added 561 responsive AVIF display assets at 640, 1280 and 1920 pixels for project, service and about-page imagery. Original files remain available to the project lightbox.
- Added an art-directed 9:16 homepage hero for mobile. The Lighthouse-selected hero transfer is approximately 142 KB instead of the prior 1.06 MB image; the final total homepage transfer is 823 KiB versus 6,915 KiB in the baseline.
- Added smaller logo and WhatsApp candidates and corrected their responsive `sizes` values.
- Preserved page styling and below-fold reveal animations. Above-fold service copy renders immediately so it is not hidden again after hydration.
- Kept the interactive project lightbox and Instagram code deferred until needed.
- Added a deeper brand-gold text token on ivory and white surfaces. Decorative gold, fills, borders and dark-background treatments retain the original brand gold; Lighthouse color contrast and accessibility now pass at 100 on all six sampled pages.

## Final Lighthouse mobile results

These are single-run Lighthouse 13.5 lab measurements against the final build through the local Cloudflare Pages runtime. Default simulated mobile throttling was used. Scores can move between runs and are not field Core Web Vitals.

| Page | Performance | LCP | FCP | TBT | CLS | Transfer | SEO | Accessibility |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 81 | 4.61 s | 1.81 s | 101 ms | 0 | 823 KiB | 100 | 100 |
| Projects | 75 | 4.32 s | 2.38 s | 209 ms | 0 | 821 KiB | 100 | 100 |
| Services overview | 76 | 5.24 s | 2.07 s | 138 ms | 0.001 | 1,009 KiB | 100 | 100 |
| Habillage mural | 91 | 3.29 s | 1.79 s | 76 ms | 0 | 395 KiB | 100 | 100 |
| Dressing sur mesure | 87 | 3.85 s | 1.79 s | 70 ms | 0 | 497 KiB | 100 | 100 |
| Cuisine sur mesure | 90 | 3.48 s | 1.82 s | 58 ms | 0 | 424 KiB | 100 | 100 |

The homepage improved from the original **39 performance / 29.0 s LCP / 6,915 KiB** to **71 / 4.70 s / 823 KiB**. CLS is stable. The final LCP values remain above the 2.5-second “good” lab threshold, so performance should remain a launch risk to monitor rather than being reported as passed.

## Validation passed

- Production TypeScript/client/SSR build and generation of 39 documents.
- Static audit of all 38 public pages: zero errors for required metadata, unique titles/descriptions/content, one H1, meaningful HTML, image alternatives, local assets/srcsets, internal links, canonical origin/path, sitemap, robots and JSON-LD parsing.
- Browser audit through Cloudflare Pages local runtime: all 38 preferred routes return 200; all 37 old path forms redirect to the preferred trailing-slash form; three invalid route classes return 404 with `noindex, follow`.
- All 38 pages hydrate at 390 px with one H1, one canonical and one JSON-LD block, with no horizontal overflow or runtime/hydration errors.
- Key layouts, including the three new services, fit 320, 390, 768 and 1440 px viewports.
- New services and project pages select AVIF display images; the lightbox still opens the full original and closes with Escape.
- Contact phone required/format checks, empty dropdown error, immediate error clearing, stored multi-select values, last-option removal, required “Autre” details and encoded WhatsApp payload all pass. No message was sent by the test.
- Mobile navigation, saved-language hydration/navigation and hero controls pass.
- `npm audit`: zero known vulnerabilities.
- Lint: zero errors and four pre-existing warnings.

## Files changed in the final pass

- `src/components/ResponsiveImage.tsx`, project cards/galleries/details and service pages: responsive AVIF delivery with original-image fallback and full originals retained for the lightbox.
- `src/components/HeroSlider.tsx`, `public/images/hero/*` and `scripts/optimize-images.py`: smaller desktop hero variants, art-directed mobile hero assets and reproducible image generation.
- `public/images/responsive/**`: 561 generated AVIF display assets for project, service and about imagery.
- `public/fonts/**`, `src/index.css` and `index.html`: self-hosted Cormorant/Raleway with local preloads; external render-blocking font CSS removed.
- `src/utils/urls.ts`, SEO/structured-data generation, navigation components and `public/sitemap.xml`: one apex, trailing-slash preferred URL format aligned with Cloudflare Pages.
- `src/components/Reveal.tsx`: above-fold service copy renders immediately; existing below-fold reveal animations remain.
- `scripts/audit-browser.mjs` and the audit documents: preferred-route redirects, responsive-image selection, all-route mobile behavior and final metric evidence.

## Remaining launch risks

1. **Mobile LCP is still above 2.5 seconds in the final local lab runs.** The image-transfer problem is substantially reduced; remaining work is mainly JavaScript/main-thread and render delay. Do not claim good Core Web Vitals until production PageSpeed or field data confirms it.
2. **The www host did not resolve in the last external check.** Configure and verify HTTPS for `www.elevadesign.ma` before enabling its redirect to the apex.
3. **Crawler/WAF access needs a production check.** Earlier generic Python User-Agent requests received 403 while browser User-Agent requests received 200. Use Cloudflare security events and Google Search Console URL Inspection after deployment to confirm that Googlebot is not challenged.
Non-blocking advisories: five titles are over 65 characters and three descriptions over 170; full-resolution gallery originals can still be several megabytes but load only when the user opens the lightbox; the Instagram gallery depends on Simpleembed/Instagram; the contact action opens WhatsApp and does not persist a lead in a backend.

## Post-deployment owner actions

1. Verify the `elevadesign.ma` Domain property in Google Search Console, submit `https://elevadesign.ma/sitemap.xml`, inspect the homepage, projects page and three priority service pages, then monitor canonical selection, indexing, queries and Core Web Vitals.
2. Track Casablanca-first groups separately: habillage mural, dressing sur mesure and cuisine sur mesure. Use Search Console impressions, clicks, CTR and qualified enquiries; no ranking position or date is guaranteed.
3. Verify `www.elevadesign.ma` HTTPS before any future redirect activation. DNS, redirects and Cloudflare security settings remain outside this code release.

Full Lighthouse JSON and final screenshots are stored locally in `%TEMP%\eleva-audit-production`. The concise metric evidence is in `final-lighthouse-results.json`.

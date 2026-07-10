# ScentDuel — Project Worklog

A niche fragrance content site built around head-to-head comparisons and tested
layering combinations. Built to an 11-phase architecture adapted to a single-route
sandbox.

---

Task ID: ALL
Agent: main (GLM Z.ai Code)
Task: Build ScentDuel — a production-grade Next.js 16 fragrance comparison &
layering site, mirroring an 11-phase architecture (djguider.com lineage),
adapted to the sandbox's single-route constraint.

Work Log:
- Inspected existing scaffold (Next.js 16.1.3, Turbopack, Tailwind v4, full shadcn/ui set, bun, Node v24.18.0).
- Phase 1 (Foundation): rewrote next.config.ts for `output: "export"` + `images.unoptimized`; added .nvmrc (24), package.json `engines` (>=24 <27) + `packageManager` (pnpm); added wrangler.jsonc (Workers Static Assets, SPA not_found_handling); added src/app/robots.ts + sitemap.ts; removed the unused api/route.ts (incompatible with static export); renamed package to `scentduel`; updated build/preview/deploy scripts.
- Phase 2 (Design system): rewrote globals.css with the locked palette as CSS variables (cream #F7F3EC bg, surface #FFF, elevated #F1EBDF, border #E4DDD0, ink #241F1A, muted #8A8175, wine #7A2331, gold #B8863B), dark-mode variants, Fraunces (display) + Public Sans (body) via next/font/google, editorial helpers (.eyebrow, .paper-grain, .sd-rule, .sd-fade-up, custom scrollbar). Rewrote layout.tsx with full ScentDuel metadata + OG + Twitter.
- Phase 3/7 (Content + Data): typed schema in src/lib/types.ts (Article, Fragrance, FragranceNote, DuelSide, MetricRow, BodyBlock, FaqItem) mirroring the MDX frontmatter spec. Fragrance single-source-of-truth dataset (15 real fragrances) in src/lib/fragrance-data.ts with noteOverlap() + suggestLayering() engines. Article content in src/lib/articles.ts (9 seed articles across comparison/layering/guide). Cross-reference validation in src/lib/content.ts (throws on broken fragrance/article refs — equivalent to build-time link checking).
- Phase 5 (Duel post template): ArticleView renders label → headline → direct-answer capsule → byline → two-card VS duel → verdict callout → metrics table → body → FAQ → related duels. Emits Article + BreadcrumbList + FAQPage JSON-LD.
- Phase 2 (UI primitives): Logo (Scent/Duel wordmark, wine "Duel"), Eyebrow, VsBadge (circular wine, cream text), FragranceCard (house, note pyramid, longevity/sillage/price stat strip), DuelLayout (two-card + VS, responsive stack on mobile), VerdictCallout (gold left border + confidence meter), MetricsTable (3-col spec comparison + notes), FaqAccordion (radix accordion + FAQPage JSON-LD), ArticleBody (typed block renderer), ArticleCard.
- Phase 6 (Comparator — flagship tool): fully client-side Comparator with searchable FragrancePicker (cmdk combobox grouped by house), DuelLayout reuse, generated note-overlap analysis (similarity %, shared notes by tier, contrasting tops, spec comparison table, layering verdict), swap-sides button, preset duels, and secondary Layering Combo Finder (contrast-rule engine). Own shareable URL #/comparator with WebApplication JSON-LD and ?f= preselect from search.
- Phase 4 (Layout/nav/taxonomy): Header (logo left, 4 nav links, search right, mobile slide-down nav), Footer (sticky via min-h-screen flex + main flex-1), SearchDialog (client-side static search across articles + fragrances incl. note contents), CategoryView, AboutView, HomeView (hero, lead card, category strip, featured, "why we exist" diff section, archive grid, comparator CTA).
- Phase 8 (SEO): per-view JSON-LD (Organization, WebSite, Article, BreadcrumbList, FAQPage, WebApplication), metadata + OG + Twitter in layout, sitemap.ts, robots.ts, canonical. SPA uses hash routes (#/article/<slug> etc.) for shareability within the sandbox's single-route constraint.
- Phase 9 (Performance): self-hosted fonts via next/font (no runtime font requests), static-exportable (no SSR), CSS variables (no runtime theme), comparator dataset is tiny (15 frags) so no code-splitting needed yet.
- Phase 10 (Content seed): 9 articles — (1) Bleu de Chanel × Santal 33 layering, (2) Khamrah vs Angels' Share smells-like, (3) Afnan Supremacy vs Aventus beast-vs-reference, (4) Terre d'Hermès EDT vs EDP concentration, (5) Dior Homme Intense vs Prada Infusion d'Iris gender-label duel, (6) Acqua di Parma Colonia × Santal 33 citrus-on-wood layering, (7) maceration guide, (8) sample-vs-full-bottle guide, (9) how-to-test-a-duel guide. Each has a 40-60 word direct-answer opener, metrics table, FAQ, named author, visible updated date.
- Phase 11 (Build/test/deploy): scripts (dev/build/preview/deploy), wrangler.jsonc, .nvmrc, engines. README authored with setup + content-authoring + deploy instructions.
- Verification: `bun run lint` clean. agent-browser end-to-end QA: home renders all 9 articles; article duel template (VS cards, verdict, metrics, FAQ accordion expand) verified; comparator (pickers, presets, swap, 12%/18% similarity recalc, layering finder) verified; search (articles + fragrance-by-note matches) verified; search→comparator ?f= preselect verified; JSON-LD confirmed in DOM (Article+BreadcrumbList+FAQPage on articles); mobile responsive (cards stack, VS centered) verified via VLM; desktop visual design verified via VLM (polished magazine aesthetic, correct palette + serif). No errors/hydration warnings in dev.log.

Stage Summary:
- Status: COMPLETE for all 11 phases adapted to the sandbox. Site is interactive, runnable, lint-clean, and visually polished.
- Key decisions / flags (see README "Assumptions" section): (a) Single-route SPA with hash routing instead of multi-route static export — sandbox limits user-visible routes to `/`. Real multi-route deploy is documented. (b) Typed TS content module instead of MDX — identical frontmatter shape, trivial MDX migration later. (c) Sandbox runs on bun; pnpm/Node 24 pins documented for the real target. (d) next.config uses `output: "export"`; dev server tolerates it (export only affects build).
- Artifacts: src/lib/{types,fragrance-data,articles,content}.ts; src/components/site/* (16 components); src/app/{page,layout,globals.css,robots.ts,sitemap.ts}; next.config.ts, wrangler.jsonc, .nvmrc, README.md.

Unresolved issues / risks / next-phase priorities:
- Real multi-route static export: to ship true indexable article URLs (/article/<slug>, /category/<comparisons>) on Cloudflare, move each Article/Category/Comparator to its own route under src/app/ and use generateStaticParams. The data layer + components are already route-agnostic.
- MDX pipeline: if an editor workflow is needed, swap src/lib/articles.ts for content/**/*.mdx parsed with gray-matter + next-mdx-remote; the BodyBlock type maps 1:1 to MDX components.
- OG images: currently no static OG image generation. Add @vercel/og or a build-time script writing /public/og/<slug>.png.
- Content depth: 9 seed articles; spec suggested 8-10 so this is in range, but the comparator would benefit from a larger fragrance dataset (currently 15) for richer pairings.
- Tests: no test suite (per instruction). For a real deploy, add a content-validation unit test + a Playwright smoke for the golden path.
- Newsletter/contact: any future dynamic feature must be a standalone Worker or third-party service (static export constraint) — do not bolt SSR onto the main app.

---
Task ID: REVIEW-1
Agent: main (GLM Z.ai Code)
Task: Review the current codebase and implementation, troubleshoot potential issues, and continue improving the engineering details.

Work Log:
- Re-read worklog + audited all source files (page.tsx, comparator, fragrance-picker, article-view, search-dialog, header, duel-layout, fragrance-data, content).
- Identified and confirmed 3 real bugs + 5 engineering/a11y improvements via code review + agent-browser DOM inspection:
  1. BUG (SEO): ArticleView breadcrumb JSON-LD URL used singular `#/category/comparison` but the route expects plural `#/category/comparisons` — broken structured-data link. Confirmed in DOM: `[".../#/category/comparison", ...]`.
  2. BUG (logic): `suggestLayering()` classified families into only `heavyFamilies`/`lightFamilies` sets; Floral was in neither, so Floral-based fragrances (Dior Homme Intense, Prada Infusion d'Iris) returned ZERO layering suggestions. Confirmed via direct engine test.
  3. BUG (UX): SearchDialog query state wasn't reset when the dialog closed via Escape/backdrop (only when a result was selected) → stale results on reopen.
  4. ENH (dead code → feature): Comparator destructured `onNavigate` but never used it. No way to share a manually-configured duel.
  5. ENH (perf): ArticleView `useMemo([article, frags])` was ineffective — `frags` is a new array each render, so the memo recomputed every time.
  6. ENH (a11y): mobile menu toggle had no `aria-expanded`; search results `<ul>` had no `role="listbox"`/label; missing `Cmd/Ctrl+K` shortcut.
  7. CODE SMELL: `article.sides!` non-null assertion where a guarded check would do.

Fixes applied:
- Centralized the Category↔URL-segment mapping in `src/lib/content.ts` as a single source of truth: `CATEGORY_SEGMENT`, `CATEGORY_LABEL`, `categoryHash()`. This eliminates the drift that caused bug #1 — every consumer now derives the plural segment from one place.
- ArticleView: switched breadcrumb URL to `categoryHash(article.category)`; rewrote the `frags`/`sideLabels`/`isDuel` derivation as a single `useMemo` keyed only on `article`; replaced `article.sides!` with a guarded `article.sides &&` check.
- fragrance-data.ts: rewrote `suggestLayering()` with a 3-tier weight model (`light`/`mid`/`heavy`) via `FAMILY_WEIGHT` + `WEIGHT_ORDER`. Floral is now `mid`, so it pairs with both light (freshens top) and heavy (grounds base). Cleaner control flow — a single `fIsLighter` boolean determines role. Verified: Dior Homme Intense now returns 6 suggestions (was 0).
- SearchDialog: added `handleOpenChange` wrapper that clears `q` on close; wired it into both the Dialog `onOpenChange` and the result-select handler. Added `role="listbox"` + `aria-label="Search results"` + `role="option"` on each result; `aria-label` on the input + clear button.
- Comparator: full URL-sync overhaul. Route type changed from `preselect: string|null` to `sideA/sideB: string|null`; parser reads `?a=&b=` (with legacy `?f=` fallback for side A). Comparator accepts `initialA`/`initialB`, and on every picker/preset/swap change calls `syncUrl()` which uses `history.replaceState` (avoids polluting back-button history). Added a "Copy link" share button with `navigator.clipboard.writeText` + toast feedback (`useToast`); the previously-dead `onNavigate` prop is now meaningfully used by the share flow. Search-dialog fragrance hits now link via `?a=` (canonical) instead of `?f=`.
- Header: added `aria-expanded` + dynamic `aria-label` on the mobile menu toggle; `aria-label="Search (Ctrl K)"` + `aria-keyshortcuts` on the search button.
- page.tsx: added a `keydown` listener for `Cmd/Ctrl+K` that toggles the search dialog.

Verification:
- `bun run lint` clean (before and after).
- agent-browser end-to-end confirmed every fix:
  - Breadcrumb URL now `#/category/comparisons` (plural) in JSON-LD. ✓
  - Floral fragrances return 6 layering suggestions (was 0). ✓
  - Search query empty after close+reopen. ✓
  - Preset click updates URL to `#/comparator?a=...&b=...`. ✓
  - Shared URL `?a=lattafa-khamrah&b=kilian-angels-share` loads the correct duel. ✓
  - "Copy link" button present + fires "Link copied" toast. ✓
  - Cmd+K opens the search dialog. ✓
- No errors/warnings/hydration issues in dev.log; server returns 200.

Stage Summary:
- All 3 bugs fixed + 4 engineering/a11y improvements shipped. The comparator is now a first-class shareable tool (every duel has a URL), the layering engine covers all 10 fragrance families, the breadcrumb structured data is correct, and search has proper a11y semantics + keyboard shortcut.
- Single source of truth introduced for the category↔URL mapping prevents the class of bug that caused the breadcrumb drift.
- No new dependencies; all fixes use existing shadcn primitives (useToast, Radix Dialog semantics).

Unresolved / next-phase:
- The `allowedDevOrigins` Next.js dev warning (cross-origin preview requests) is cosmetic — it only affects the dev server, not the static export. Can be silenced by adding the preview origin to next.config.ts `allowedDevOrigins` if desired.
- The home-page `ComparatorPreview` still hardcodes "28%" overlap as a static visual — could compute the real default-duel overlap, but it's purely decorative.
- Consider extracting the hash-router in page.tsx into a small `useHashRoute` hook if more routes are added.

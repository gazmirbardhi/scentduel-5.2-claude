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

---
Task ID: CRON-REVIEW-2
Agent: main (GLM Z.ai Code)
Task: Scheduled webDevReview — assess status, QA via agent-browser, then independently add features + improve styling (mandatory).

Work Log:
- Re-read worklog (11 phases + REVIEW-1 complete; site stable, lint-clean).
- QA via agent-browser across home/comparator/article/category — all 200, no errors, no hydration warnings. Confirmed stable baseline.
- Decided this round = feature + styling expansion (no bugs to fix). Built 4 new features + 1 fix:

FEATURE 1 — Dark mode toggle (styling + feature):
- Wired `next-themes` ThemeProvider into layout.tsx (attribute="class", defaultTheme="light", enableSystem, disableTransitionOnChange). The dark CSS variables already existed in globals.css from the original build but had no toggle UI.
- Created `theme-provider.tsx` (client wrapper) + `theme-toggle.tsx` (sun/moon button). First toggle impl used a `mounted` state guard which tripped the `react-hooks/set-state-in-effect` lint rule; refactored to render both icons and toggle visibility via Tailwind `dark:` variants — zero setState-in-effect, no hydration mismatch, no FOUC.
- Added the toggle to the Header between Search and the mobile menu button.

FEATURE 2 — Fragrance profile pages (new route #/fragrance/<id>):
- Added `articlesForFragrance()` and `fragrancesPairedWith()` helpers to content.ts.
- Built `fragrance-profile-view.tsx`: header (name/house/concentration/family), blurb, 4 stat tiles (longevity/sillage-dots/price/family), a color-coded note pyramid (Top=gold, Heart=wine, Base=ink accents), "Duels featuring <name>" grid (reuses ArticleCard), "Paired with" fragrance chips (link to other profiles), and a CTA to open the fragrance in the comparator. Emits Product + BreadcrumbList JSON-LD.
- Wired the `#/fragrance/<id>` route into page.tsx (route type + parser + render + activeHash).
- Made FragranceCard names clickable: added optional `onOpenFragrance` prop → threads through DuelLayout → ArticleView (duel cards) + Comparator (duel cards). Article fragrance names are now buttons that navigate to the profile.
- Search dialog fragrance hits now link to the profile page (was: preselect comparator) — more useful for browsing.
- Sitemap.ts expanded to enumerate all article + fragrance routes for SEO.

FEATURE 3 — Reading-progress bar (styling):
- `reading-progress.tsx`: a fixed 2px wine→gold gradient bar under the header (top-16 to clear the 64px sticky header) that fills as the reader scrolls through the <article>. Tracks the article ref's scroll position via a passive scroll listener + resize handler.

FEATURE 4 — Sticky table of contents with scroll-spy (styling):
- `table-of-contents.tsx`: generated from the article's `heading` body blocks. Sticky on desktop (lg+), hidden on mobile/tablet. Uses IntersectionObserver (rootMargin "0px 0px -70% 0px") to highlight the active section; clicking a TOC link smooth-scrolls with an 80px header offset.
- ArticleView restructured into a two-column layout (`lg:grid-cols-[minmax(0,1fr)_200px]`): main content + TOC sidebar. Computed deduplicated heading IDs via a new `slugify()` helper in utils.ts; ArticleBody now accepts a `headingIdMap` and applies `id` + `scroll-mt-24` to headings. TOC renders only when there are ≥3 headings.

FIX — ComparatorPreview hardcoded "28%":
- Home page's decorative comparator preview was hardcoded to "28% note overlap". Now imports `noteOverlap` + `fragranceById` and computes the real overlap of the default duel (Bleu de Chanel vs Santal 33 = 12%). The progress bar width and label are now dynamic.

Verification (agent-browser + VLM):
- Dark mode: toggle present, html class flips `light`↔`dark`, persists across nav. VLM confirmed warm dark palette (dark brown bg, cream text, wine/gold accents — not generic black/blue). ✓
- Fragrance profile route: `#/fragrance/lattafa-khamrah` renders all sections (Note pyramid / Duels featuring / Paired with / CTA); emits Product + BreadcrumbList JSON-LD. ✓
- Article TOC: 4 TOC links (matches 4 headings), reading-progress bar present, fragrance names in duel cards are clickable buttons (2 of 6 h3s). ✓
- Clicking a fragrance name navigates to `#/fragrance/<id>`. ✓
- Home ComparatorPreview now shows "12% note overlap" (was "28%"). ✓
- VLM verified article-with-TOC layout in light mode: sticky TOC with active highlighting, progress bar, clean two-column composition, no layout bugs. ✓
- `bun run lint` clean. No errors/warnings/hydration issues in dev.log. Server 200.

Stage Summary:
- 2 new features (dark mode, fragrance profile pages) + 2 styling additions (reading progress, sticky TOC with scroll-spy) + 1 correctness fix (real overlap %).
- Dark mode leverages existing dark CSS vars — no new design work needed, just the toggle plumbing.
- Fragrance profile pages add genuine navigational depth: every fragrance in every duel card is now a link, and search fragrance hits go to profiles instead of just preselecting the comparator. The profile → comparator → article triangle is now fully connected.
- Article UX leveled up: reading-progress + scroll-spy TOC bring the long-form reads in line with the editorial-magazine aesthetic.
- All new code is client-side / static-export compatible (no server, no new deps beyond the already-installed next-themes).

Unresolved / next-phase:
- Dark mode could persist a per-article preference (currently global) — low value.
- The TOC is desktop-only; a mobile "jump to section" select could be added but the articles aren't long enough to warrant it yet.
- Fragrance dataset is still 15 frags; expanding it would make the profile pages + comparator richer.
- OG images still not generated at build time (carried over).

---
Task ID: CRON-REVIEW-3
Agent: main (GLM Z.ai Code)
Task: Scheduled webDevReview — assess status, QA via agent-browser, then independently add features + improve styling (mandatory).

Work Log:
- Re-read worklog (11 phases + REVIEW-1 + CRON-REVIEW-2 complete; site stable, lint-clean).
- QA via agent-browser across home/comparator/fragrance-profile — all 200, no errors, no hydration warnings. Confirmed stable baseline.
- Decided this round = editorial-feature expansion (no bugs to fix). Built 4 new features:

FEATURE 1 — Reading-time estimate (content + styling):
- Added `readingMinutes(article)` to content.ts: counts words across body blocks (heading/paragraph/callout/quote/list items) + direct-answer capsule + FAQ Q&As, divides by 220 wpm (slower than the 250 default — fragrance prose is denser), returns ≥1 min.
- Integrated into the ArticleView byline as a third item (Clock icon + "N min read"), alongside author + updated date.

FEATURE 2 — Social share buttons (feature):
- Built `share-buttons.tsx`: X/Twitter, Facebook, and copy-link. The social targets open in a new 600×600 window with the current page URL (works with SPA hash routes); copy-link uses navigator.clipboard.writeText with a toast fallback ("Link copied" / "Copy failed"). Button shows a gold check for 2s after copy.
- Placed in the ArticleView byline, right-aligned opposite the author/date/reading-time items, so the bar is now a proper editorial byline+share row.

FEATURE 3 — Recently-viewed tracker (feature):
- Built `use-recently-viewed.ts` hook: tracks up to 6 recently-visited article slugs in localStorage. First implementation used setState-in-effect (tripped the lint rule); refactored to `useSyncExternalStore` with an in-memory cache + listener set — the canonical React pattern for external stores, SSR-safe via a window guard in the snapshot function, zero setState-in-effect.
- page.tsx records an article visit (slug/title/label/category) whenever the route resolves to an article, via the existing hashchange sync effect.
- Built `recently-viewed.tsx` "Pick up where you left off" section for the home page (history icon, list of visited duels with label/title/visited-date, a Clear button). Renders only after the user has visited ≥1 article (returns null otherwise — no empty state on first visit). Inserted between the hero and the category strip on home.

FEATURE 4 — Tag/house filter on category pages (feature):
- Added `tagsForCategory()` and `housesForCategory()` helpers to content.ts (with counts, sorted by frequency).
- Rewrote `category-view.tsx` with a filter UI: a Tag/House toggle (wine pill on the active mode) + a row of filter chips. Clicking a chip filters the article grid live; clicking it again or "Clear" resets. Shows "N of M articles" count that updates with the filter. Empty-state message with a clear-filter link when no articles match.
- Filter is client-side only (no URL state needed since the dataset is small); resets when switching categories via the parent key.

Verification (agent-browser + VLM):
- Reading time: byline shows "2 min read". ✓
- Share buttons: X/Twitter + Facebook + copy-link all present; copy-link fires "Link copied" toast. ✓
- Recently-viewed: visited 2 articles → home page shows "Pick up where you left off" section with both. ✓
- Category filter: Tag/House toggle present; House mode shows 7 house chips; clicking "Lattafa Perfumes" filters 4→1 article (Khamrah vs Angels' Share, the only Lattafa article). ✓
- VLM verified byline layout: author/updated/reading-time on left, share buttons right-aligned, balanced spacing, matches warm editorial aesthetic. ✓
- `bun run lint` clean. No errors/warnings/hydration issues in dev.log. Server 200.

Stage Summary:
- 4 new editorial features shipped: reading-time, social share, recently-viewed tracking, category tag/house filtering.
- The byline is now a proper editorial bar (author + date + reading time + share) matching the magazine aesthetic.
- Recently-viewed adds genuine return-visit value — users can resume duels they were comparing, with a one-click Clear for privacy.
- Category pages are now filterable by tag or house, scaling better as the article set grows.
- useSyncExternalStore pattern adopted for the localStorage hook — idiomatic React, lint-clean, SSR-safe.
- All new code is client-side / static-export compatible (no server, no new deps).

Unresolved / next-phase:
- Recently-viewed could also surface on a dedicated "history" route, but the home section is sufficient for the current article volume.
- Category filter could sync to the URL (?tag=woody) for shareable filtered views — low value at current dataset size.
- OG images still not generated at build time (carried over from earlier rounds).
- Fragrance dataset still 15 frags (carried over).

---
Task ID: CRON-REVIEW-4
Agent: main (GLM Z.ai Code)
Task: Scheduled webDevReview — assess status, QA via agent-browser, then independently add features + improve styling (mandatory).

Work Log:
- Re-read worklog (11 phases + 3 review rounds complete; site stable, lint-clean).
- QA via agent-browser across home/comparator/article — all 200, no errors, no hydration warnings. Confirmed stable baseline.
- Decided this round = user-power-features + card scannability (no bugs to fix). Built 3 new features:

FEATURE 1 — Bookmark/save duels (user feature):
- Built `use-bookmarks.ts` hook following the same `useSyncExternalStore` pattern as use-recently-viewed (lint-clean, SSR-safe, in-memory cache + listener set). Returns `items`, `isSaved`, `toggle`, `remove`, `clear`.
- Built `bookmark-toggle.tsx`: a Save/Saved button for article pages. Uses `useToast` for feedback ("Saved" / "Removed from saved"). Visual state: outline "Save" (bookmark icon) → filled gold "Saved" (check icon) when active.
- Added the BookmarkToggle to the ArticleView byline, left of the ShareButtons, so the right side of the byline is now [Save] [Share X | f | link].
- Built `saved-duels.tsx` "Your saved duels" section for the home page (bookmark icon, count badge, list with per-item remove × and a Clear-all). Renders only when the user has ≥1 saved duel. Placed between RecentlyViewed and the category strip on home.

FEATURE 2 — Quick-verdict snippet on article cards (styling/scannability):
- Added a verdict block to `article-card.tsx`: when an article has a verdict, the card shows a "VERDICT" label + 2-line italic snippet of the verdict title, with a gold left border accent. Sits between the description and the fragrance tags. Makes the home/category grids scannable without opening each article.

FEATURE 3 — Keyboard shortcuts overlay + G-sequence navigation (feature):
- Built `keyboard-shortcuts.tsx` dialog: lists all shortcuts (Cmd+K search, ? panel, Esc close, G+H/C/L/G/D sequence nav) with `<kbd>`-styled keys.
- Wired into page.tsx with an extended keydown handler:
  - Cmd/Ctrl+K → toggle search (existing).
  - ? (or Shift+/) → toggle shortcuts panel.
  - G + key → sequence navigation: G then H=home, C=comparisons, L=layering, G=guides, D=comparator. Sequence expires after 1.2s.
  - All letter shortcuts are suppressed while typing in a text field or while any dialog is open (prevents collision with the search input / accordion).
- Added the KeyboardShortcuts dialog to the page render alongside SearchDialog.

Verification (agent-browser + VLM):
- Bookmark: Save button present on article; clicking shows "Saved" toast; navigating home shows "Your saved duels" section with the saved article; returning to the article shows the button in "Remove from saved duels" (gold) state — persistence confirmed. ✓
- Verdict snippets: 4 verdict blocks on the comparisons category page (one per card). VLM confirmed gold left border, readable italic, well-integrated, no layout bugs. ✓
- Keyboard shortcuts: ? opens the panel; G then L navigates to #/category/layering (verified URL + h1). ✓
- VLM verified byline: Save button visually distinct (gold) from white share buttons, balanced alignment, no bugs. ✓
- `bun run lint` clean. No errors/warnings/hydration issues in dev.log. Server 200.

Stage Summary:
- 3 new features shipped: bookmark/save (with home section), quick-verdict card snippets, keyboard-shortcuts overlay + G-sequence navigation.
- The home page now has two personalized sections (RecentlyViewed + SavedDuels) that appear contextually — a passive "where you left off" + an active "what you saved".
- Article cards are now scannable: title + description + verdict snippet + fragrance tags, so a reader can judge a duel's conclusion without opening it.
- Power-user keyboard nav (G+key sequences + ? help) brings the site up to the UX standard of editorial apps like Linear/GitHub.
- All new code is client-side / static-export compatible (no server, no new deps). useSyncExternalStore pattern reused for the bookmarks hook — consistent with the recently-viewed hook.

Unresolved / next-phase:
- Bookmarks could sync to a #/saved route for a dedicated saved-duels page; the home section is sufficient at current article volume.
- Keyboard shortcuts could add article navigation (J/K next/prev article) — low value with 9 articles.
- OG images still not generated at build time (carried over from earlier rounds).
- Fragrance dataset still 15 frags (carried over).

---
Task ID: CRON-REVIEW-5
Agent: main (GLM Z.ai Code)
Task: Scheduled webDevReview — assess status, QA via agent-browser, then independently add features + improve styling (mandatory).

Work Log:
- Re-read worklog (11 phases + 4 review rounds complete; site stable, lint-clean).
- QA via agent-browser across home/comparator/article — all 200, no errors, no hydration warnings. Confirmed stable baseline.
- Decided this round = fragrance-data enrichment + print + scroll UX (no bugs to fix). Built 3 new features:

FEATURE 1 — Occasion/season tags + comparator fit table + profile chips (data + feature + styling):
- Added an `occasions: Occasion[]` field to the Fragrance type (new `Occasion` union: summer/winter/spring/autumn/office/date-night/casual/formal/beast-mode).
- Tagged all 15 fragrances in the dataset with editor-judged occasions (e.g. Bleu de Chanel → autumn/winter/office/casual/formal; Khamrah → winter/autumn/date-night/beast-mode; Acqua di Parma Colonia → summer/spring/office/casual).
- Built an `OccasionFit` table in the comparator's Analysis panel: a 3-column table (Occasion | Side A | Side B) where each cell shows a gold "Fits" marker or an em-dash. Rows where both fragrances fit get a subtle gold tint. A footer note lists shared occasions or notes "no shared occasions — these two suit different settings."
- Added a "Best for" occasion-chips section to the FragranceProfileView (gold dot + label per occasion, between the stat tiles and the note pyramid).

FEATURE 2 — Print-friendly article stylesheet (styling):
- Added a comprehensive `@media print` block to globals.css: forces black-on-white palette (ink economy), hides header/footer/nav/TOC/search-toggle/theme-toggle/scroll-to-top/reading-progress/share+bookmark (via `data-print-hidden` + `aria-label` + class selectors), expands the article to full width, removes the fade-up animation, prevents break-inside on verdict callouts and tables, and avoids orphaned headings. `print-color-adjust: exact` ensures the verdict/table accents still print.
- Added `data-print-hidden` to the share/bookmark container in ArticleView, and a `reading-progress` class to the ReadingProgress root so the print rule catches it.
- Verified the print rules are present in the served stylesheet. This supports the methodology guide's "print paper-strip checklists" use case.

FEATURE 3 — Scroll-to-top floating button (feature + styling):
- Built `scroll-to-top.tsx`: a fixed bottom-right round button that appears (with a pop-in animation) after the user scrolls past 600px and smooth-scrolls to top on click. Hidden on print via the `.sd-pop-in` class (caught by the print stylesheet).
- Added a matching `sd-pop-in` keyframe to globals.css.
- Mounted in the page shell (page.tsx) so it's available on every route.

Verification (agent-browser + VLM):
- Occasion fit: comparator shows "Occasion fit" section + "Fits" markers. ✓
- Occasion chips: fragrance profile shows Winter / Beast mode (for Khamrah). ✓
- Scroll-to-top: appears after scrolling 1500px on an article; clicking returns scrollY to 0. ✓
- Print CSS: `@media print` rule confirmed in the served stylesheet (header/footer/nav hidden, black-on-white forced). ✓
- VLM verified occasion fit table: present, readable, gold "Fits" dots visible, clean layout, no overflow. ✓
- `bun run lint` clean. No errors/warnings/hydration issues in dev.log. Server 200.

Stage Summary:
- 3 new features shipped: occasion tags (data + comparator fit table + profile chips), print stylesheet, scroll-to-top button.
- The comparator is now a richer decision tool: beyond note overlap, it shows which occasions each fragrance suits and where they overlap — directly answering "which one should I wear tonight?"
- Fragrance profiles now show "Best for" chips, giving a scannable occasion summary at a glance.
- Print support makes the methodology guide + duel verdicts printable — a real use case for a fragrance-testing site.
- Scroll-to-top is a small but genuine editorial-UX touch for the long article pages.
- All new code is client-side / static-export compatible (no server, no new deps).

Unresolved / next-phase:
- Occasions could drive a "find a fragrance for tonight" tool (pick occasion → get matching frags) — the data layer now supports it.
- Print could include a QR code or slug URL footer for printed articles — low value.
- OG images still not generated at build time (carried over from earlier rounds).
- Fragrance dataset still 15 frags (carried over).

---
Task ID: CRON-REVIEW-6
Agent: main (GLM Z.ai Code)
Task: Scheduled webDevReview — assess status, QA via agent-browser, then independently add features + improve styling (mandatory).

Work Log:
- Re-read worklog (11 phases + 5 review rounds complete; site stable, lint-clean).
- QA via agent-browser across home/comparator/article — all 200, no errors, no hydration warnings. Confirmed stable baseline.
- Decided this round = data expansion + the occasion-finder tool explicitly flagged as next-phase in CRON-REVIEW-5. Built 2 things:

DATA EXPANSION — fragrance dataset 15 → 20 (across 13 → 17 houses):
- Added 5 well-known fragrances chosen to round out houses/families and make the comparator + finder genuinely useful:
  - MFK Baccarat Rouge 540 EDP (Oriental, the iconic saffron-amber)
  - Jo Malone Wood Sage & Sea Salt (Fresh/Cologne, the anti-gourmand salty-herbal)
  - Parfums de Marly Layton (Oriental, the gateway-niche apple-lavender-vanilla)
  - Penhaligon's Halfeti (Oriental, dark rose-leather-oud)
  - Aesop Hwyl (Woody, hinoki-cypress-moss Japanese forest)
- Each has full data: concentration, longevity, sillage, family, gender marketing, price, note pyramid (top/heart/base), blurb, and occasion tags.
- All 5 are auto-available in the comparator picker, search index, layering finder, and the new occasion finder with no further wiring (single source of truth).

FEATURE — "Wear Tonight" occasion finder (new route #/find):
- Added `fragrancesForOccasion(occasion)` + `occasionCounts()` helpers to content.ts. Ranking favours specialists (fewer total occasions = better fit for the chosen one) weighted by sillage + longevity.
- Built `occasion-finder-view.tsx`: a dedicated page with a 9-button occasion grid (date-night, office, summer, winter, spring, autumn, formal, casual, beast-mode — each with an icon, one-line blurb, and live count of matching scents). Selecting an occasion renders a ranked numbered list (rank · name · house · family/concentration/longevity/sillage · price · arrow), each row linking to the fragrance profile. A CTA at the bottom offers to duel the top match in the comparator. Emits WebApplication + BreadcrumbList JSON-LD.
- Wired the `#/find` route into page.tsx (route type + parser + render + activeHash). Added a footer "Wear Tonight Finder" link + a sitemap entry.
- This realises the next-phase opportunity flagged in CRON-REVIEW-5 ("Occasions could drive a 'find a fragrance for tonight' tool — the data layer now supports it").

Verification (agent-browser + VLM):
- Dataset: confirmed 20 fragrances across 17 houses; Baccarat Rouge 540 (new) appears in beast-mode finder results alongside existing frags. ✓
- Finder: `#/find` renders with 9 occasion buttons; clicking "Date night" shows a ranked "Best for date night" list; clicking the #1 result navigates to `#/fragrance/lattafa-asad`. ✓
- VLM verified finder layout: occasion grid present with active button (Date night) visually distinct in wine; ranked results list readable; no layout bugs. ✓
- `bun run lint` clean. No errors/warnings/hydration issues in dev.log. Server 200.

Stage Summary:
- Dataset expanded 15→20 fragrances (13→17 houses), making the comparator and finder materially more useful — the long-flagged "still 15 frags" caveat is resolved.
- New "Wear Tonight" occasion finder ships the next-phase opportunity from last round: a genuine decision tool that answers "what should I wear tonight?" by occasion, ranked by specialist-fit + performance.
- The fragrance data layer continues to be the single source of truth — the 5 new frags automatically appear in the comparator picker, search, layering finder, occasion-fit table, and occasion finder with zero extra wiring.
- All new code is client-side / static-export compatible (no server, no new deps).

Unresolved / next-phase:
- The occasion finder could let users pick multiple occasions (e.g. "date night + winter") and intersect — low value at current dataset size.
- A few new frags share families (Oriental is now heavy); a family-balance view could help — low value.
- OG images still not generated at build time (carried over from earlier rounds).

---
Task ID: CRON-REVIEW-7
Agent: main (GLM Z.ai Code)
Task: Scheduled webDevReview — assess status, QA via agent-browser, then independently add features + improve styling (mandatory).

Work Log:
- Re-read worklog (11 phases + 6 review rounds complete; site stable, lint-clean).
- QA via agent-browser across home/comparator/finder — all 200, no errors, no hydration warnings. Confirmed stable baseline.
- Decided this round = discovery/exploration features (no bugs to fix). Built 2 new features:

FEATURE 1 — "Surprise me" random duel (feature):
- Added `randomDuelPair(currentA, currentB)` helper to content.ts: picks two distinct fragrance ids, preferring to differ from the current pair. Uses `crypto.getRandomValues` for unbiased selection when available, falls back to Math.random.
- Added a "Surprise me" button (Dices icon, wine-tinted outline that fills wine on hover, icon rotates 12° on hover) to the comparator, next to the "Or try a preset duel" heading. Clicking picks a fresh random pair and syncs the URL — so every random duel is shareable.
- Encourages discovery/serendipity across the now-20-fragrance dataset.

FEATURE 2 — Fragrance family explorer (new route #/families, feature + styling):
- Added `fragrancesByFamily()` helper to content.ts: groups the dataset by family, sorted by count desc.
- Built `family-explorer-view.tsx`: a dedicated page with (a) a family-overview grid where each card shows the family name + scent count, color-tagged per family (Woody = sage green, Oriental/Floral = wine, Citrus/Fresh = gold, Gourmand = brown, etc.), and (b) a selected-family detail panel with a one-line family blurb (e.g. "Amber, vanilla, spice, resin. Heavy, sweet, warm.") and a grid of fragrance rows (house, name, concentration/longevity/sillage/price, + a "Duel" button that opens the fragrance in the comparator + the name links to the profile). First family auto-expanded on load.
- Wired the `#/families` route into page.tsx (route type + parser + render + activeHash). Added a footer "Browse by Family" link + a sitemap entry.
- FAMILY_BLURB + FAMILY_COLOR maps give each of the 10 families a distinct editorial description and accent color.

Verification (agent-browser + VLM):
- Surprise me: button present; clicking it picks a random pair and updates the URL to `#/comparator?a=terre-dhermes-edt&b=aesop-hwyl` (verified the URL reflects a fresh random selection). ✓
- Family explorer: `#/families` renders with headline + family grid; clicking "Oriental" reveals the family blurb ("Amber, vanilla, spice...") + fragrance rows (Asad, Baccarat Rouge 540, Layton, Halfeti, Khamrah, Angels' Share). ✓
- VLM verified family explorer: family grid present with counts, selected-family detail visible with fragrance rows, family color tags visible, no layout bugs. ✓
- `bun run lint` clean. No errors/warnings/hydration issues in dev.log. Server 200.

Stage Summary:
- 2 new discovery features shipped: "Surprise me" random duel + fragrance family explorer.
- The comparator now has three entry points into a duel: manual pick, presets, and random — covering intent-driven, curated, and serendipitous discovery.
- The family explorer gives a scannable overview of the whole dataset by accord family, with per-family color tags and blurbs — useful for readers who know they want "a woody scent" but not which one.
- The site now has 4 tools in the footer: Comparator, Wear Tonight Finder, Browse by Family, About — a genuine toolkit for a fragrance reader.
- All new code is client-side / static-export compatible (no server, no new deps).

Unresolved / next-phase:
- The family explorer could cross-link to the comparator (duel two frags from the same family) — low value, the per-fragrance Duel button already covers it.
- Random duel could be weighted (e.g. prefer cross-family pairs for more interesting comparisons) — low value.
- OG images still not generated at build time (carried over from earlier rounds).

---
Task ID: CRON-REVIEW-8
Agent: main (GLM Z.ai Code)
Task: Scheduled webDevReview — assess status, QA via agent-browser, then independently add features + improve styling (mandatory).

Work Log:
- Re-read worklog (11 phases + 7 review rounds complete; site stable, lint-clean).
- QA via agent-browser across home/comparator/families — all 200, no errors, no hydration warnings. Confirmed stable baseline.
- Decided this round = decision-helper + reference content (no bugs to fix). Built 2 new features:

FEATURE 1 — Value score (performance-per-dollar) on comparator + profiles (feature + styling):
- Added `valueScore(f)` + `valueBand(score)` helpers to content.ts. Score = (longevityHours × 2 + sillage × 4) ÷ price, normalised to 0-100 across the dataset (higher = better value). Bands: ≥70 "Exceptional value" (wine), ≥45 "Good value" (gold), ≥25 "Fair value" (neutral), else "You pay for the name".
- Added a `ValueScorePanel` to the comparator's Analysis section (between spec table and occasion fit): two side-by-side cards with fragrance name, large score "/100", a horizontal progress bar (gradient wine→gold for the winner, gray for the loser), price + longevity/sillage footer, and a wine-bordered card highlighting the winner when the gap ≥5 points. Surfaced the cheap-vs-expensive insight (e.g. Lattafa Asad $25 beats Dior Sauvage Elixir $200 on value).
- Added a value-score strip to the FragranceProfileView (below the 4 stat tiles): large score + bar + banded label, so every fragrance page states its value verdict at a glance.

FEATURE 2 — Fragrance glossary (new route #/glossary, reference content):
- Created `src/lib/glossary.ts` with 25 terms across 6 themed groups: The note pyramid (top/heart/base), Performance (longevity/sillage/projection/beast-mode), Concentration (EDC/EDT/EDP/Extrait), Testing & methodology (maceration/mouillette/skin test/olfactory fatigue/batch variation), Market & marketing (gender marketing/niche/designer/dupe), Scent families (Woody/Oriental/Gourmand/Citrus/Fougère). Each entry has a 1-2 sentence definition aimed at the beginner/intermediate collector; some have "See also" cross-references.
- Built `glossary-view.tsx`: a dedicated page with headline + intro, a live search input (filters across terms + definitions with a match count), and the 6 themed accordion sections (reusing the radix Accordion). Emits BreadcrumbList JSON-LD.
- Wired the `#/glossary` route into page.tsx (route type + parser + render + activeHash). Added a footer "Glossary" link + a sitemap entry. The site footer now has 5 tools (Comparator / Wear Tonight / Browse by Family / Glossary / About).

Verification (agent-browser + VLM):
- Value score (comparator): "Value score" section + "/100" present; VLM confirmed two cards with progress bars, winner (Asad) wine-tinted with gradient bar, no layout bugs. ✓
- Value score (profile): "Performance-per-dollar" text + value band label present on fragrance profiles. ✓
- Glossary: `#/glossary` renders h1 "Fragrance glossary" + 6 themed sections + search input; searching "sillage" filters to the sillage term; clicking a term expands its definition (4 accordion elements open). VLM confirmed 6 themed sections, search present, no layout bugs. ✓
- `bun run lint` clean. No errors/warnings/hydration issues in dev.log. Server 200.

Stage Summary:
- 2 new features shipped: value-score decision helper + fragrance glossary.
- The comparator now answers "which one is the better buy?" not just "how do they compare" — the value-score panel makes the cheap-vs-expensive insight (e.g. Asad $25 vs Sauvage Elixir $200) immediately visible with a gradient bar + winner callout.
- Every fragrance profile now states its value verdict at a glance (score + banded label), giving readers a quick "is this worth it?" signal.
- The glossary serves the site's core "beginner or intermediate collector" audience with 25 defined terms across 6 themes, directly explaining the jargon used in the duels, comparator, and methodology guide. Live search makes it a usable reference tool.
- The footer toolkit is now 5 strong: Comparator, Wear Tonight Finder, Browse by Family, Glossary, About.
- All new code is client-side / static-export compatible (no server, no new deps).

Unresolved / next-phase:
- Glossary terms could be auto-linked from article body text (e.g. "sillage" in an article → hover tooltip) — meaningful but non-trivial; deferred.
- Value score could factor in concentration (Extrait priced higher per ml but lasts longer) — current formula is intentionally simple and transparent.
- OG images still not generated at build time (carried over from earlier rounds).

---
Task ID: CRON-REVIEW-9
Agent: main (GLM Z.ai Code)
Task: Scheduled webDevReview — assess status, QA via agent-browser, then independently add features + improve styling (mandatory).

Work Log:
- Re-read worklog (11 phases + 8 review rounds complete; site stable, lint-clean).
- QA via agent-browser across home/comparator/glossary — all 200, no errors, no hydration warnings. Confirmed stable baseline.
- Decided this round = content-interlinking + value-data surfacing (no bugs to fix). Built 2 new features, one of which realises the deferred next-phase item from CRON-REVIEW-8:

FEATURE 1 — Glossary auto-linking in article body (realises CRON-8 deferred item):
- Built `glossary-text.tsx` with two exports:
  - `tokenizeGlossary(text)`: tokenises a string into plain-text + term segments. Longest terms win (so "Eau de Parfum" matches before "Parfum"), word-boundary anchored on both sides (no matching "leather" inside "unsweetened"), and each term matched at most once per string (avoids spammy repeated links). Flat term index built once from GLOSSARY, sorted longest-first.
  - `GlossaryText`: renders the tokenised segments; term segments become dotted-underline buttons that open a radix HoverCard tooltip with the term's definition + a "Click to open the full glossary →" hint, and clicking navigates to #/glossary. Gold dotted underline + wine hover matches the editorial palette.
- Threaded `onNavigate` from ArticleView → ArticleBody → GlossaryText, applied to prose blocks (paragraph, callout, quote, list items). Headings left plain for visual cleanliness.
- Verified: the methodology article ("how to test a duel at home") now has "projection" and "olfactory fatigue" auto-linked as glossary terms.

FEATURE 2 — "Top value" leaderboard on home (feature + styling):
- Added `fragrancesByValue()` helper to content.ts: returns all fragrances ranked by valueScore (best first), each with its score + band.
- Built `top-value-leaderboard.tsx`: a top-5 ranked list on the home page. Each row has a rank badge (#1 = trophy with wine/gold gradient circle, #2-5 = plain numbered circle), fragrance name + house, family/longevity/sillage/price meta, a horizontal value-score bar (gradient wine→gold for #1, gray for the rest), the score "/100", the band label, and an arrow. The #1 row gets a wine/gold tinted background. Each row links to the fragrance profile.
- Placed on home between the archive grid and the comparator CTA.

Verification (agent-browser + VLM):
- Glossary auto-linking: methodology article body shows 2 dotted-underline glossary links ("projection", "olfactory fatigue"); hovering shows the term. ✓
- Top value leaderboard: home shows "Best value in the dataset" section with 5 ranked items; clicking #1 navigates to `#/fragrance/lattafa-asad` (the $25 beast-mode fragrance that correctly tops the value ranking). VLM confirmed 5 ranked rows, #1 has a trophy badge with wine/gold tint, no layout bugs. ✓
- `bun run lint` clean. No errors/warnings/hydration issues in dev.log. Server 200.

Stage Summary:
- 2 new features shipped: glossary auto-linking in article body + top-value leaderboard on home.
- The glossary is now woven into the article reading experience — terms a beginner might not know (sillage, longevity, EDP, maceration, olfactory fatigue, etc.) are visually marked and explorable via hover tooltip without leaving the article, with a click-through to the full glossary. This realises the deferred next-phase item from CRON-REVIEW-8.
- The home page now surfaces the value-score data as a scannable leaderboard, immediately answering "which fragrances punch above their price?" — Lattafa Asad ($25) and the other Arabic beast-mode scents correctly top it, which is a genuine editorial insight the site is uniquely positioned to make.
- Article reading → glossary tooltip → glossary page → fragrance profile → comparator → value score is now a fully connected knowledge graph.
- All new code is client-side / static-export compatible (no server, no new deps).

Unresolved / next-phase:
- Glossary auto-linking could extend to the comparator analysis text and article descriptions/cards — currently scoped to article body prose only.
- The leaderboard could link to a full #/value ranking page — the home top-5 is sufficient at current dataset size (20 frags).
- OG images still not generated at build time (carried over from earlier rounds).

---
Task ID: CRON-REVIEW-10
Agent: main (GLM Z.ai Code)
Task: Scheduled webDevReview — assess status, QA via agent-browser, then independently add features + improve styling (mandatory).

Work Log:
- Re-read worklog (11 phases + 9 review rounds complete; site stable, lint-clean).
- QA via agent-browser across home/comparator/article — all 200, no errors, no hydration warnings. Confirmed stable baseline.
- Decided this round = visual comparison + editorial binge-nav (no bugs to fix). Built 2 new features:

FEATURE 1 — Comparator five-axis radar chart (recharts, feature + styling):
- Built `comparator-radar.tsx` using recharts' RadarChart (already a project dep). Five axes, each normalised to 0-100 so the two polygons are directly comparable:
  - Longevity (0-12h → 0-100)
  - Sillage (0-5 → 0-100)
  - Value (the valueScore helper, already 0-100)
  - Price-inverted (cheaper = bigger, normalised against the two)
  - Overlap (the noteOverlap similarity %, shared by both)
- Two overlapping polygons: wine (Side A) + gold (Side B) with 0.18 fill opacity + 2px stroke. PolarGrid + PolarAngleAxis (with the public-sans font) + PolarRadiusAxis (0-100, 3 ticks) + a Tooltip + Legend. Uses CSS variables (var(--wine), var(--gold), var(--border), var(--muted-foreground)) so it adapts to dark mode automatically.
- Placed in the comparator Analysis section between the note-overlap block and the spec comparison table — gives an instant visual shape comparison before the detailed tables.
- VLM verified: pentagon with 5 axes, two overlapping polygons (wine for Bleu de Chanel, gold for Santal 33), readable legend, no layout bugs.

FEATURE 2 — Article prev/next pager (editorial binge-nav, feature + styling):
- Added `articleNeighbours(slug)` helper to content.ts: orders articles by publishedDate and returns prev/next (wrapping around so the last article's "next" is the first).
- Built `article-pager.tsx`: a two-button nav (Previous duel ← / → Next duel) shown at the bottom of article pages, after Related duels. Each button shows the neighbour's label + title, with an arrow that nudges on hover. The "Previous" button aligns left, "Next" aligns right (sm:col-start-2), with a hidden spacer when one side is missing so the layout stays balanced on desktop.
- Wired into ArticleView via useMemo(articleNeighbours) + render after the Related duels section.
- Verified: on the Khamrah article, the pager shows Previous=Bleu de Chanel × Santal 33 layering, Next=Afnan Supremacy vs Aventus; clicking Next navigates correctly.

Verification (agent-browser + VLM):
- Radar: comparator shows "Five-axis comparison" section; SVG surface present; 5 axes (Longevity, Sillage, Value, Price-inv., Overlap) labelled. VLM confirmed pentagon + two overlapping wine/gold polygons + readable legend, no layout bugs. ✓
- Pager: Khamrah article bottom shows 2 pager buttons (Previous duel: Bleu de Chanel layering; Next duel: Afnan Supremacy vs Aventus); clicking Next → #/article/afnan-supremacy-vs-aventus. ✓
- `bun run lint` clean. No errors/warnings/hydration issues in dev.log. Server 200.

Stage Summary:
- 2 new features shipped: comparator five-axis radar + article prev/next pager.
- The comparator now leads with a visual shape comparison (the radar) before the detailed tables — readers get an instant "these two are similar/different" gestalt from the polygon shapes, then drill into the spec/value/occasion tables.
- The article pager adds editorial binge-navigation, letting readers move through the duel archive sequentially (by publication date) without returning to the category page — a standard editorial-site affordance that was missing.
- recharts (already a dependency) is now used for the radar; CSS-variable theming means the chart adapts to dark mode with no extra work.
- All new code is client-side / static-export compatible (no server, no new deps).

Unresolved / next-phase:
- The radar could become interactive (click an axis to jump to the corresponding spec row) — low value.
- The pager could respect the current category (prev/next within Comparisons only) — the publication-order pager is more useful for binge-reading the whole archive.
- OG images still not generated at build time (carried over from earlier rounds).

---
Task ID: CRON-REVIEW-11
Agent: main (GLM Z.ai Code)
Task: Scheduled webDevReview — assess status, QA via agent-browser, then independently add features + improve styling (mandatory).

Work Log:
- Re-read worklog (11 phases + 10 review rounds complete; site stable, lint-clean).
- QA via agent-browser across home/comparator/article — all 200, no errors, no hydration warnings. Confirmed stable baseline.
- Decided this round = time-relevance + decision-nudge (no bugs to fix). Built 2 new features:

FEATURE 1 — Seasonal spotlight on home (feature + styling):
- Added `seasonForMonth(month)` + `seasonalSpotlight(now)` helpers to content.ts. seasonForMonth maps month → meteorological season (winter=Dec/Jan/Feb, spring=Mar-May, summer=Jun-Aug, autumn=Sep-Nov). seasonalSpotlight returns the top-ranked fragrance for the current season (reuses fragrancesForOccasion's specialist-fit + performance ranking).
- Built `seasonal-spotlight.tsx`: a rounded card on the home page (just below the hero) with a circular wine/gold gradient icon badge (Snowflake/Leaf/Sun/Cloud by season), an eyebrow "Scent for the season · {Season}", a headline "Cold outside? Reach for {fragrance}" (greeting varies by season), the fragrance blurb, and two CTAs (View profile → #/fragrance/<id>, Duel it → #/comparator?a=<id>). The fragrance name in the headline is a wine link to its profile.
- Auto-refreshes as the months turn — no manual curation needed. VLM verified for summer: card present, circular gradient icon, "Supremacy Not Only Intense" (correctly a summer-ranked scent) highlighted in wine, no layout bugs.

FEATURE 2 — Comparator "better-value alternative" suggestion (feature + decision-nudge):
- Added `betterValueAlternative(fragrance, alsoExcludeId)` helper to content.ts: returns the highest-value fragrance in the same family as the given one (excluding itself + the duel winner), but only if that alternative's value score is actually higher than the original's. Returns null otherwise — so the suggestion only fires when it's a genuine improvement.
- Enhanced the comparator's `ValueScorePanel`: after the winner callout, when the loser has a better-value same-family alternative, a wine-tinted suggestion box appears — "Same family as {loser} but better value: {alternative} (NN/100, $XX) ⇄" — where the alternative is a clickable link that loads a new comparator duel (alternative vs the original winner). This surfaces the editorial insight "you could get the same family for less" directly in the head-to-head.
- Verified with Baccarat Rouge 540 ($325, Oriental, score 8) vs Lattafa Asad ($25, Oriental, score 100): the suggestion correctly offers "Same family as Baccarat Rouge 540 but better value: Layton (11/100, $200)". VLM confirmed wine-tinted, clickable, no layout bugs. Correctly returns null for pairs where no same-family improvement exists (e.g. the Khamrah vs Angels' Share gourmand pair, where the cheaper Khamrah already wins).

Verification (agent-browser + VLM):
- Seasonal spotlight: home shows the card below the hero; current month (July) → summer → "Supremacy Not Only Intense" spotlighted. VLM confirmed card present, circular gradient icon, fragrance name in wine, no layout bugs. ✓
- Better-value alternative: Baccarat vs Asad comparator shows "Same family as Baccarat Rouge 540 but better value: Layton (11/100, $200)" suggestion box, wine-tinted, clickable. VLM confirmed present + wine-tinted + clickable + no layout bugs. ✓
- `bun run lint` clean. No errors/warnings/hydration issues in dev.log. Server 200.

Stage Summary:
- 2 new features shipped: seasonal spotlight + comparator better-value alternative suggestion.
- The home page now has a time-relevant entry point that changes automatically with the season — a "right now" recommendation that gives returning visitors something fresh without manual curation.
- The comparator now actively nudges readers toward better-value choices within the same family — turning a head-to-head into a genuine buying decision tool. The suggestion only fires when a real improvement exists, so it never feels forced.
- Both features leverage existing data layers (occasions + valueScore + family), reinforcing the single-source-of-truth architecture.
- All new code is client-side / static-export compatible (no server, no new deps).

Unresolved / next-phase:
- Seasonal spotlight could rotate through the top 3 seasonal frags on each visit — low value, the #1 is the right pick.
- The alternative suggestion could consider note-overlap (not just family) for tighter "smells-similar but cheaper" suggestions — current family-level match is the right scope for a value nudge.
- OG images still not generated at build time (carried over from earlier rounds).

---
Task ID: REVIEW-2
Agent: main (GLM Z.ai Code)
Task: Review the current codebase and implementation, troubleshoot potential issues, and continue improving the engineering details.

Work Log:
- Re-read worklog (11 phases + 11 cron-review rounds complete; site stable, lint-clean).
- Audited the most complex/recently-added code: comparator.tsx (ValueScorePanel + alternative suggestion), content.ts (valueScore/fragrancesByValue/betterValueAlternative), glossary-text.tsx (tokenizer + dead state), seasonal-spotlight.tsx.
- Identified and fixed 4 real engineering issues:

ISSUE 1 — BUG (performance): `valueScore()` recomputed the dataset max on every call → O(N²) in loops.
- `valueScore(f)` called `Math.max(...FRAGRANCES.map(...))` (the dataset max) on every invocation. `fragrancesByValue()` calls `valueScore` once per fragrance, and `betterValueAlternative` calls it 2+ times — so both were O(N²).
- Confirmed cost: 16ms/1000 calls with 20 frags; would degrade to ~400ms/1000 at 100 frags.
- Fix: extracted `rawValueOf(f)` + computed `MAX_RAW_VALUE` once at module load. `valueScore` is now O(1); `fragrancesByValue` is now O(N). Verified scores unchanged (Asad=100, Baccarat=8) and perf: fragrancesByValue x10000 dropped from would-be ~160ms to 38ms.

ISSUE 2 — CODE SMELL: `ValueScorePanel` bypassed the SPA router with `window.location.hash`.
- The alternative-suggestion button set `window.location.hash` directly instead of using the `onNavigate` callback the parent Comparator already had. This worked (fires hashchange) but was inconsistent with the rest of the app's navigation abstraction and would break in any test/non-browser environment.
- Fix: threaded `onNavigate` from Comparator → Analysis → ValueScorePanel. (Required adding `onNavigate` to the Analysis signature too, since ValueScorePanel is rendered inside Analysis.) The alternative button now calls `onNavigate(...)` like every other nav action.

ISSUE 3 — BUG (dead code): `GlossaryText` had a `clicked` state that was never usefully set.
- `const [clicked, setClicked] = useState<string | null>(null)` — `setClicked` was only called in `onMouseEnter` (set to null), and `clicked === seg.term` was always false. The `useState` import + the `onMouseEnter` handler + the conditional className were all dead.
- Fix: removed the `clicked` state, the `useState` import, the `onMouseEnter` handler, and the now-unused `cn` import. GlossaryText is now stateless (just `useMemo` for tokenization).

ISSUE 4 — BUG (logic): `ValueScorePanel` winner-callout had a convoluted, always-true condition.
- The original: `winner.typicalPriceUSD < Math.min(a.price, b.price) + 1 && winner.id !== (aScore > bScore ? b.id : a.id)`. The second condition was always true when there's a winner (winner.id !== loser.id by definition), making it dead. The first condition (`< Math.min + 1`) was a roundabout way to check "winner is the cheaper one".
- Fix: replaced with a clear `winnerIsCheaper` boolean: `winner.typicalPriceUSD < Math.max(a.typicalPriceUSD, b.typicalPriceUSD)`. Same behaviour, readable intent, no dead condition.

Verification (agent-browser + unit-style):
- valueScore: scores unchanged (Asad=100, Baccarat=8); fragrancesByValue top-5 identical to pre-fix; perf now O(N). ✓
- Alternative suggestion: still present for Baccarat vs Asad; clicking navigates to #/comparator?a=parfums-de-marly-layton&b=lattafa-asad (via onNavigate, not window.location.hash). ✓
- Winner callout: "clearly better value" + "cheaper scent out-points the pricier one" messages show correctly for Asad ($25) vs Baccarat ($325). ✓
- Glossary auto-linking: methodology article still shows 2 dotted-underline links (projection, olfactory fatigue); tooltip hover still works. ✓
- All routes (home/comparator/glossary/article) render without errors; `bun run lint` clean; no hydration/runtime errors in dev.log. ✓

Stage Summary:
- 4 engineering issues fixed: O(N²) valueScore → O(N), router-bypassing window.location.hash → onNavigate, dead GlossaryText state removed, convoluted winner-callout condition simplified.
- Caught a regression during the fix: threading `onNavigate` into ValueScorePanel required also threading it through Analysis (which renders ValueScorePanel). Without that, the comparator crashed with a client-side error on render. Fixed and verified.
- No behaviour changes — all fixes are internal (performance, abstraction consistency, dead-code removal, readability). The site's functionality and UX are unchanged.
- The value-score computation is now safe to scale (O(N) per ranking call); the comparator's navigation is fully consistent with the SPA router; the glossary component is simpler and stateless.

Unresolved / next-phase:
- The `tokenizeGlossary` function is O(text.length × terms) per call — fine for article-length strings + 25 terms, but could build a Trie if the glossary grows large.
- Several components (Comparator, ArticleView) are large single files; extracting sub-components (ValueScorePanel, OccasionFit, Analysis) into separate files would improve navigability — low priority, no behaviour impact.
- OG images still not generated at build time (carried over from earlier rounds).

---
Task ID: REVIEW-3
Agent: main (GLM Z.ai Code)
Task: Review the current codebase and implementation, troubleshoot potential issues, and continue improving the engineering details.

Work Log:
- Re-read worklog (REVIEW-2 fixed 4 issues; site stable, lint-clean).
- Audited areas not yet covered: comparator-radar.tsx, use-recently-viewed.ts, use-bookmarks.ts, search-dialog.tsx, page.tsx routing, articles.ts validation, noteOverlap normalisation.
- Identified and fixed 4 engineering issues:

ISSUE 1 — BUG (dead code): comparator-radar.tsx imported `fragranceById` and assigned `allFrags = [a, b]` but never used either.
- `import { noteOverlap, fragranceById }` — `fragranceById` unused. `const allFrags = [a, b]` — assigned but never read. Both leftovers from an earlier iteration of the normalisation logic.
- Fix: removed the unused import + the dead `allFrags` line; corrected the stale docstring (mentioned "Projection-fitness" which isn't an axis; the actual 5th axis is "Overlap"). Radar renders identically.

ISSUE 2 — BUG (redundant work): both hooks' `clear()` called `localStorage.removeItem` after `writeToStorage([])` already persisted `"[]"`.
- `writeToStorage([])` sets `memoryCache=[]` and writes `JSON.stringify([])` = `"[]"` to localStorage. The subsequent `localStorage.removeItem(STORAGE_KEY)` was redundant — it deleted the key that `writeToStorage` just wrote. Functionally harmless (both leave no data), but inconsistent and did an extra localStorage write.
- Fix: removed the redundant `removeItem` + try/catch from both hooks' `clear`. Single `writeToStorage([])` call now does the full clear.

ISSUE 3 — BUG (hydration re-parse): hooks used `memoryCache.length > 0` as the "already hydrated" guard, which fails after a clear.
- After `clear()` sets `memoryCache = []` (length 0), the guard `if (memoryCache.length > 0) return memoryCache` is false, so the next `getSnapshot` call re-reads + re-parses localStorage on every snapshot until a non-empty item is added. Wasteful, and could theoretically race if another tab wrote between the clear and the re-read.
- Fix: replaced the `length > 0` guard with an explicit `initialized` boolean flag, set to `true` after the first hydration AND on every `writeToStorage` call (a write supersedes any pending hydration). Now localStorage is parsed exactly once per page load, regardless of subsequent clears. Applied to both `use-recently-viewed` and `use-bookmarks` for consistency.

ISSUE 4 — ENH (consolidation): article validation was split across two files.
- `articles.ts` had a `validate()` checking duplicate slugs + sides count. `content.ts` had `validateCrossRefs()` checking broken fragrance/article references. The split meant the "single source of truth for validation" claim in the worklog wasn't quite true, and the two functions used different naming conventions.
- Fix: consolidated both into `content.ts` → `validateContent()` (single function, single call site, single source of truth). Removed the duplicate `validate()` from `articles.ts` and left a comment pointing to the consolidated location. The validation now covers: duplicate slugs, duel-sides count, broken fragrance refs (fragrancesInvolved + sides), and broken article refs (related) — all in one pass.

Verification (agent-browser):
- Radar: "Five-axis comparison" section + SVG surface still render after dead-code removal. ✓
- Recently viewed: visit article → "Pick up where you left off" appears on home → Clear → section disappears. ✓
- Bookmarks: Save on article → "Your saved duels" appears on home. ✓
- No console errors, no hydration warnings. `bun run lint` clean. Server 200.

Stage Summary:
- 4 engineering issues fixed: comparator-radar dead code removed, hooks' redundant localStorage.removeItem removed, hooks' hydration guard hardened (initialized flag prevents re-parse after clear), article validation consolidated into one function.
- The localStorage hooks are now more robust: exactly one parse per page load, writes supersede pending hydration, clears are a single operation.
- Validation is truly single-source-of-truth now (content.ts → validateContent), matching the worklog's original claim.
- No behaviour changes — all fixes are internal (dead code, redundancy, robustness, consolidation).

Unresolved / next-phase:
- The `tokenizeGlossary` function is still O(text.length × terms) per call — fine at current scale (25 terms, article-length strings); a Trie would help if the glossary grows large.
- Comparator + ArticleView are large single files; extracting sub-components (Analysis, ValueScorePanel, OccasionFit) into separate files would improve navigability — low priority.
- OG images still not generated at build time (carried over from earlier rounds).

---
Task ID: FEATURE-FOOTER-PAGES
Agent: main (GLM Z.ai Code)
Task: Add missing footer pages (About, Author, Privacy, Terms, Cookies, Sitemap, RSS) + keep light mode as default.

Work Log:
- Confirmed About page already existed (#/about). The footer had "About ScentDuel" but was missing Author, Privacy, Terms, Cookies, Sitemap, RSS.
- Fixed light mode default: removed `enableSystem` from the ThemeProvider in layout.tsx. Previously `defaultTheme="light"` was overridden by `enableSystem` (OS dark preference would win). Now light is the strict default; users can still toggle to dark via the header button, and their choice persists.
- Built 6 new pages + 1 XML feed:

1. Author page (#/author) — `author-view.tsx`: editorial team profiles (M. Aldridge, Senior Editor; R. Okafor, Contributing Editor) with bios, focus-area chips, and each editor's published duels listed (auto-pulled from ARTICLES by author name). Contact CTA. Emits BreadcrumbList JSON-LD.

2. Privacy policy (#/privacy) — `privacy-view.tsx` using the new shared `LegalPage` layout: plain-English policy covering what we don't collect (no analytics, no tracking, no server logs), localStorage usage (bookmarks + recently-viewed keys documented), theme cookie, external links, contact. Emits BreadcrumbList JSON-LD.

3. Terms of use (#/terms) — `terms-view.tsx`: editorial independence (no sponsored verdicts), performance-ratings disclaimer (editor-tested approximations, not manufacturer claims), acceptable use, comparator/finder tool disclaimer, external links, limitation of liability. Emits BreadcrumbList JSON-LD.

4. Cookie policy (#/cookies) — `cookies-view.tsx`: a table documenting the single `theme` functional cookie (purpose, duration, type), explicit list of cookies NOT used, localStorage clarification with a cross-link to privacy, browser-specific instructions for managing cookies. Emits BreadcrumbList JSON-LD.

5. Sitemap (#/sitemap) — `sitemap-view.tsx`: a human-readable directory of every page on the site, grouped: Top-level pages, Interactive tools, Articles (by category, with dates), Fragrance profiles (chips for all 20), Legal & policies (links to all the new pages + /rss.xml + /sitemap.xml + /robots.txt). Emits BreadcrumbList JSON-LD.

6. RSS feed info (#/rss) — `rss-view.tsx`: explains the feed, shows the URL with a copy button (clipboard + toast), step-by-step "how to use an RSS reader" guide, and what you'll get in the feed. Emits BreadcrumbList JSON-LD.

7. RSS XML feed (/rss.xml) — `src/app/rss.xml/route.ts`: a Route Handler with `export const dynamic = "force-static"` (static-export compatible) that generates a valid RSS 2.0 feed at build time. Includes all 9 articles with: title, link, GUID, description (direct-answer capsule + verdict headline), categories (article category + fragrance names), pubDate, dc:creator. Verified: 9 items, valid XML, served as application/rss+xml.

- Built a shared `LegalPage` + `LegalSection` component (`legal-page.tsx`) for the Privacy/Terms/Cookies pages — consistent back button, eyebrow, headline, last-updated date, intro, and prose typography. Keeps the legal pages DRY.
- Rewrote the footer (`footer.tsx`) with a new legal link bar: a horizontal `nav[aria-label="Site information"]` with About · Authors · Privacy · Terms · Cookies · Sitemap · RSS (dot-separated, hover-wine). Removed the old "About ScentDuel" from the Tools column (it's now in the legal bar). Three rows: brand+columns, legal bar, copyright.
- Wired all 6 new routes into page.tsx (route type + parser + render + activeHash). Added sitemap.ts entries for all new routes + /rss.xml.

Verification (agent-browser + VLM):
- Light mode default: html class = "light" on load (no OS dark override). ✓
- Footer: legal nav present with all 7 links (About|Authors|Privacy|Terms|Cookies|Sitemap|RSS) dot-separated. VLM confirmed clean, balanced, no bugs. ✓
- All 6 new routes render: author ("Authors & editorial standards"), privacy ("Privacy policy"), terms ("Terms of use"), cookies ("Cookie policy"), sitemap ("Sitemap"), rss ("RSS feed"). ✓
- RSS feed: /rss.xml returns valid XML, 200 status, 9 <item> elements, application/rss+xml content-type. ✓
- VLM verified privacy page: well-structured, clear headings, readable editorial typography, no bugs. ✓
- `bun run lint` clean. No errors/warnings in dev.log. Server 200.

Stage Summary:
- 6 new pages + 1 XML feed shipped: Author, Privacy, Terms, Cookies, Sitemap, RSS info page, and /rss.xml.
- Light mode is now the strict default (enableSystem removed) — no more OS dark-mode override on first visit.
- The footer is now a complete editorial-site footer with brand, navigation columns, a legal link bar, and copyright — matching the standard set by established editorial sites.
- The RSS feed is a real, build-time-generated XML file at /rss.xml (not just an info page) — subscribable in any RSS reader.
- All legal pages use plain English, are honest about the site's minimal data footprint (one functional cookie, two localStorage keys, no analytics), and cross-link to each other.
- Sitemap page complements the machine-readable /sitemap.xml with a human-readable directory.

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

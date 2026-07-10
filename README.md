# ScentDuel

A niche fragrance content site built around **head-to-head comparisons** and
**tested layering combinations** — deliberately targeting specific, less-obvious
"duels" rather than the two saturated fragrance-content formats (designer
dupe/clone databases, and the five world-famous comparison battles).

Built with Next.js 16 (App Router, static export), TypeScript, Tailwind CSS v4,
and a typed content layer. Deploy target: Cloudflare Workers with Static Assets.

---

## Stack

| Layer        | Choice                                                        |
| ------------ | ------------------------------------------------------------ |
| Framework    | Next.js 16.2 (App Router, `output: "export"`)                |
| Language     | TypeScript 5 (strict)                                        |
| Runtime      | Node.js 24 (Active LTS) — see `.nvmrc`                       |
| Package mgr  | pnpm (sandbox dev uses bun; production pins pnpm)            |
| Styling      | Tailwind CSS v4 + CSS variables                              |
| UI           | shadcn/ui (New York) + Lucide icons                          |
| Fonts        | Fraunces (display) + Public Sans (body), self-hosted via next/font |
| Content      | Typed TS module mirroring the MDX frontmatter schema (MDX-ready) |
| Deploy       | Cloudflare Workers + Static Assets (wrangler)               |

## Design system (locked)

- **Palette**: background `#F7F3EC`, surface `#FFFFFF`, elevated `#F1EBDF`,
  border `#E4DDD0`, text primary `#241F1A`, text secondary `#8A8175`,
  accent wine `#7A2331`, accent gold `#B8863B`.
- **Type**: Fraunces 500/600 for headings (editorial serif), Public Sans 400/500
  for body. Do not substitute Inter or a generic grotesk — the serif is the
  visual identity.
- **Duel layout**: gold letter-spaced label → serif headline → two-card
  side-by-side with a circular wine "VS" badge (stacks vertically on mobile
  with the badge centered between) → gold-left-border "VERDICT" callout →
  metrics table → FAQ accordion.

## Quick start

```bash
# install (use pnpm in production; bun works in this sandbox)
pnpm install

# develop
pnpm dev          # http://localhost:3000

# typecheck + lint
pnpm lint

# static export build (writes ./out)
pnpm build

# preview the static export locally
pnpm preview

# deploy to Cloudflare Workers
pnpm deploy       # = next build && wrangler deploy
```

> **Sandbox note**: this repo runs on `bun` in the dev sandbox. The `engines`
> field and `.nvmrc` pin Node 24 for the production target, and `packageManager`
> pins pnpm. Both work; the lockfile present is `bun.lock` for the sandbox.

## Project structure

```
src/
  app/
    layout.tsx        # fonts + metadata + JSON-LD
    page.tsx          # SPA shell (hash router): home / category / article / comparator / about
    globals.css       # design tokens (palette, fonts, helpers)
    robots.ts         # static robots.txt
    sitemap.ts        # static sitemap.xml
  components/
    site/             # ScentDuel components (Logo, Header, Footer, DuelLayout,
                      #   VsBadge, VerdictCallout, MetricsTable, FaqAccordion,
                      #   FragranceCard, FragrancePicker, Comparator, ArticleView,
                      #   ArticleCard, ArticleBody, SearchDialog, HomeView,
                      #   CategoryView, AboutView, json-ld, eyebrow)
    ui/               # shadcn/ui primitives
  lib/
    types.ts          # Article, Fragrance, DuelSide, MetricRow, BodyBlock, FaqItem
    fragrance-data.ts # single source of truth (15 fragrances) + overlap/layering engines
    articles.ts       # 9 seed articles + validation
    content.ts        # cross-ref validation + helpers
    utils.ts          # cn()
wrangler.jsonc        # Cloudflare Workers Static Assets config
next.config.ts        # output: "export", images.unoptimized
.nvmrc                # 24
```

## Content authoring guide

### Add a new duel article

Open `src/lib/articles.ts` and append an object to `ARTICLES`. The shape (the
same as the MDX frontmatter schema — migration to MDX is mechanical):

```ts
{
  slug: "unique-kebab-slug",            // must be unique
  category: "comparison",               // "comparison" | "layering" | "guide"
  label: "COMPARISON",                  // small gold letter-spaced label
  title: "...",
  description: "...",                   // meta description / card subtitle
  directAnswer: "...",                  // 40–60 word plain verdict (AI-citation)
  publishedDate: "2025-01-12",          // ISO
  updatedDate: "2025-03-04",
  author: { name: "M. Aldridge", role: "Senior Editor" },
  tags: ["layering", "woody"],
  fragrancesInvolved: ["bleu-de-chanel-edp", "le-labo-santal-33"], // fragrance ids
  sides: [                              // omit for guides
    { fragranceId: "bleu-de-chanel-edp", label: "Alone" },
    { fragranceId: "le-labo-santal-33", label: "Layered (1:2)" },
  ],
  verdict: {                            // omit for guides
    title: "...",
    text: "...",
    confidence: 4,                      // 1–5
  },
  metrics: [                            // rows in the spec table
    { label: "Longevity (skin)", values: ["8 hrs", "9 hrs"], note: "optional" },
  ],
  body: [                               // typed content blocks
    { kind: "paragraph", text: "..." },
    { kind: "heading", text: "..." },
    { kind: "list", items: ["...", "..."] },
    { kind: "callout", tone: "gold", text: "..." }, // wine | gold | neutral
    { kind: "quote", text: "...", cite: "..." },
  ],
  faq: [ { question: "...", answer: "..." } ], // emits FAQPage JSON-LD
  related: ["other-article-slug"],      // internal links
  featured: true,                       // show on home (optional)
}
```

**Validation runs at module load** and throws on: duplicate slugs, a duel
article without exactly 2 sides, a fragrance id that doesn't exist in
`fragrance-data.ts`, or a `related` slug that doesn't exist. This is the
build-time equivalent of failing the deploy on broken internal links.

### Add a fragrance to the dataset

Open `src/lib/fragrance-data.ts` and append to `FRAGRANCES`. This is the single
source of truth — both articles (by id) and the comparator pull spec data from
here, so never duplicate spec data inside an article.

```ts
{
  id: "unique-id",
  name: "...",
  house: "...",
  concentration: "EDP",                 // EDT | EDP | Extrait | Parfum | Cologne
  releaseYear: 2014,
  longevityHours: 8,                    // editor-tested, not manufacturer claim
  sillage: 4,                           // 1–5
  family: "Woody",                      // Citrus | Woody | Floral | Oriental | Fresh | Aromatic | Gourmand | Leather | Chypre | Fougere
  genderMarketing: "for men",           // unisex | "for men" | "for women"
  typicalPriceUSD: 130,
  notes: { top: [...], heart: [...], base: [...] },
  blurb: "one-line editor description",
}
```

## SEO & structured data

- `layout.tsx` emits site-wide metadata + OpenGraph + Twitter cards.
- Each view injects JSON-LD: `Organization` + `WebSite` (home), `Article` +
  `BreadcrumbList` + `FAQPage` (articles), `WebApplication` (comparator),
  `BreadcrumbList` (category/about).
- `sitemap.ts` and `robots.ts` are static-exported.
- Internal linking: every article links to its category and 2–3 related duels
  (declared + auto-discovered by shared fragrance).

## Deployment (Cloudflare Workers + Static Assets)

1. **Build** the static export:
   ```bash
   pnpm build      # writes ./out
   ```
2. **Deploy**:
   ```bash
   pnpm deploy     # = next build && wrangler deploy
   ```
   `wrangler.jsonc` points `assets.directory` at `./out` with
   `not_found_handling: "single-page-application"` so hash routes resolve.
3. **Custom domain** (`scentduel.com`):
   - In the Cloudflare dashboard, add the domain to the same account.
   - **Migrate nameservers to Cloudflare first** (required for Workers custom
     domains to route correctly).
   - In the Worker's **Settings → Triggers → Custom Domains**, add
     `scentduel.com` (and `www.scentduel.com`). Cloudflare provisions the cert.
   - Redeploy. The Worker serves the static assets from the edge.

### GitHub Actions CI/CD

```yaml
# .github/workflows/deploy.yml
name: deploy
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 24, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm build
      - name: Deploy to Cloudflare Workers
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

Set `CLOUDFLARE_API_TOKEN` (Workers Scripts:Edit + Workers KV:Edit if used) and
`CLOUDFLARE_ACCOUNT_ID` as repo secrets.

## Assumptions made (flagged per the brief)

1. **Single-route SPA**: the dev sandbox exposes only the `/` route, so
   ScentDuel is built as a single-page app with **hash-based routing**
   (`#/comparator`, `#/article/<slug>`, `#/category/<comparisons>`, `#/about`).
   Views are shareable. To ship true indexable multi-route URLs in production,
   move each view to its own `src/app/.../page.tsx` with `generateStaticParams`
   — the data layer and components are already route-agnostic.
2. **Content layer = typed TS module** (not MDX): the schema is identical to
   the MDX frontmatter spec, so migrating to `content/**/*.mdx` + gray-matter +
   next-mdx-remote is a mechanical change. This keeps the static export simple.
3. **Package manager**: production pins pnpm + Node 24; the dev sandbox uses
   bun. Both are documented; the lockfile present is `bun.lock`.
4. **Static export**: `next.config.ts` uses `output: "export"` +
   `images.unoptimized` per the brief. The dev server tolerates this (export
   only affects `next build`). Any future dynamic feature (newsletter, contact
   form) must be a standalone Worker or third-party service — never SSR bolted
   onto this app.

## Editorial standard

Every duel article: 40–60 word direct-answer opener, two-card VS layout,
metrics table, labelled verdict callout with confidence, FAQ block with
schema, visible last-updated date, named author. Longevity & sillage are
editor-tested approximations, not manufacturer claims. No sponsored verdicts.

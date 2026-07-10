import { ARTICLES, articleBySlug } from "./articles";
import { FRAGRANCES, fragranceById } from "./fragrance-data";
import type { Article, Category, Fragrance, Occasion } from "./types";

/**
 * Category ↔ URL segment mapping (single source of truth).
 * The internal Category type uses singular ("comparison"); URLs use plural
 * ("comparisons") for the category landing pages. Centralizing this prevents
 * the breadcrumb-URL-vs-route drift bug.
 */
export const CATEGORY_SEGMENT: Record<Category, string> = {
  comparison: "comparisons",
  layering: "layering",
  guide: "guides",
};

export const CATEGORY_LABEL: Record<Category, string> = {
  comparison: "Comparisons",
  layering: "Layering",
  guide: "Guides",
};

/** Build the shareable hash route for a category. */
export const categoryHash = (c: Category): string => `#/category/${CATEGORY_SEGMENT[c]}`;

/**
 * Cross-reference validation between articles and the fragrance dataset.
 * Runs at module load; throws on broken references — equivalent to a
 * build-time check that fails the deploy on broken internal links.
 */
function validateCrossRefs(): void {
  const fragranceIds = new Set(FRAGRANCES.map((f) => f.id));
  const articleSlugs = new Set(ARTICLES.map((a) => a.slug));
  for (const a of ARTICLES) {
    for (const fid of a.fragrancesInvolved) {
      if (!fragranceIds.has(fid)) {
        throw new Error(
          `Article "${a.slug}" references unknown fragrance id: ${fid}`
        );
      }
    }
    if (a.sides) {
      for (const s of a.sides) {
        if (!fragranceIds.has(s.fragranceId)) {
          throw new Error(
            `Article "${a.slug}" side references unknown fragrance id: ${s.fragranceId}`
          );
        }
      }
    }
    for (const r of a.related) {
      if (!articleSlugs.has(r)) {
        throw new Error(
          `Article "${a.slug}" links to unknown related article: ${r}`
        );
      }
    }
  }
}

validateCrossRefs();

export { ARTICLES, FRAGRANCES, articleBySlug, fragranceById };

export type { Article, Fragrance };

/** Articles that share at least one fragrance with the given article. */
export function relatedBySharedFragrance(article: Article): Article[] {
  const ids = new Set(article.fragrancesInvolved);
  return ARTICLES.filter(
    (a) =>
      a.slug !== article.slug &&
      a.fragrancesInvolved.some((f) => ids.has(f))
  );
}

/** Resolve an article's fragrancesInvolved to full Fragrance records. */
export function articleFragrances(article: Article): Fragrance[] {
  return article.fragrancesInvolved
    .map((id) => fragranceById(id))
    .filter((f): f is Fragrance => Boolean(f));
}

/** Every article that involves a given fragrance id (by any side). */
export function articlesForFragrance(fragranceId: string): Article[] {
  return ARTICLES.filter((a) => a.fragrancesInvolved.includes(fragranceId));
}

/** Every other fragrance that shares an article with the given one. */
export function fragrancesPairedWith(fragranceId: string): Fragrance[] {
  const paired = new Set<string>();
  for (const a of ARTICLES) {
    if (a.fragrancesInvolved.includes(fragranceId)) {
      for (const fid of a.fragrancesInvolved) {
        if (fid !== fragranceId) paired.add(fid);
      }
    }
  }
  return Array.from(paired)
    .map((id) => fragranceById(id))
    .filter((f): f is Fragrance => Boolean(f));
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Estimate reading time for an article from its body word count.
 * Uses 220 wpm (slightly slower than the 250 default — fragrance prose is
 * denser and readers skim headings/tables). Always returns ≥1 min.
 */
export function readingMinutes(article: Article): number {
  let words = 0;
  for (const b of article.body) {
    if (b.kind === "heading" || b.kind === "paragraph" || b.kind === "callout" || b.kind === "quote") {
      words += b.text.split(/\s+/).filter(Boolean).length;
    } else if (b.kind === "list") {
      for (const it of b.items) words += it.split(/\s+/).filter(Boolean).length;
    }
  }
  // Also count the direct-answer capsule + FAQ answers.
  words += article.directAnswer.split(/\s+/).filter(Boolean).length;
  for (const f of article.faq) {
    words += f.question.split(/\s+/).filter(Boolean).length;
    words += f.answer.split(/\s+/).filter(Boolean).length;
  }
  return Math.max(1, Math.round(words / 220));
}

/** All distinct tags used across articles in a category, with counts. */
export function tagsForCategory(category: Article["category"]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const a of ARTICLES) {
    if (a.category !== category) continue;
    for (const t of a.tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** All distinct houses appearing in a category's articles. */
export function housesForCategory(category: Article["category"]): { house: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const a of ARTICLES) {
    if (a.category !== category) continue;
    const houses = new Set<string>();
    for (const fid of a.fragrancesInvolved) {
      const f = fragranceById(fid);
      if (f) houses.add(f.house);
    }
    for (const h of houses) {
      counts.set(h, (counts.get(h) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([house, count]) => ({ house, count }))
    .sort((a, b) => b.count - a.count || a.house.localeCompare(b.house));
}

/**
 * Fragrances matching a given occasion, ranked by a composite of sillage,
 * longevity and editorial fit (fragrances tagged for more occasions rank
 * slightly lower — specialists beat generalists for a specific occasion).
 */
export function fragrancesForOccasion(occasion: Occasion): Fragrance[] {
  return FRAGRANCES.filter((f) => f.occasions.includes(occasion))
    .map((f) => ({
      f,
      // Specialist score: fewer total occasions = better fit for this one.
      // Performance score: sillage + longevity normalised.
      score: (10 - f.occasions.length) * 2 + f.sillage + f.longevityHours / 3,
    }))
    .sort((a, b) => b.score - a.score)
    .map((s) => s.f);
}

/** Count of fragrances matching each occasion. */
export function occasionCounts(): Record<Occasion, number> {
  const counts = {} as Record<Occasion, number>;
  for (const f of FRAGRANCES) {
    for (const o of f.occasions) {
      counts[o] = (counts[o] ?? 0) + 1;
    }
  }
  return counts;
}

/** Fragrances grouped by family, with counts. Sorted by count desc. */
export function fragrancesByFamily(): { family: Fragrance["family"]; frags: Fragrance[] }[] {
  const groups = new Map<Fragrance["family"], Fragrance[]>();
  for (const f of FRAGRANCES) {
    const arr = groups.get(f.family) ?? [];
    arr.push(f);
    groups.set(f.family, arr);
  }
  return Array.from(groups.entries())
    .map(([family, frags]) => ({ family, frags }))
    .sort((a, b) => b.frags.length - a.frags.length || a.family.localeCompare(b.family));
}

/**
 * Pick two distinct random fragrance ids — for the "Surprise me" duel.
 * Uses crypto.getRandomValues when available for unbiased selection.
 */
export function randomDuelPair(currentA?: string | null, currentB?: string | null): { a: string; b: string } {
  const pool = FRAGRANCES.map((f) => f.id);
  // Prefer to differ from the current pair when supplied.
  const candidates = pool.filter((id) => id !== currentA && id !== currentB);
  const usePool = candidates.length >= 2 ? candidates : pool;
  const pick = (exclude: string | null): string => {
    const avail = usePool.filter((id) => id !== exclude);
    const arr = avail.length > 0 ? avail : usePool;
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const idx = crypto.getRandomValues(new Uint32Array(1))[0] % arr.length;
      return arr[idx];
    }
    return arr[Math.floor(Math.random() * arr.length)];
  };
  const a = pick(null);
  const b = pick(a);
  return { a, b };
}

/**
 * Value score — performance-per-dollar, 0-100.
 * Combines longevity (hours) and sillage (1-5) into a "performance" number,
 * then divides by price to get performance-per-dollar, and normalises to a
 * 0-100 scale across the dataset. Higher = better value.
 *
 *   rawPerf = longevityHours * 2 + sillage * 4   (sillage weighted heavier)
 *   rawValue = rawPerf / max(price, 1)
 *   score = round(rawValue / maxValueInDataset * 100)
 */
export function valueScore(f: Fragrance): number {
  const rawPerf = f.longevityHours * 2 + f.sillage * 4;
  const rawValue = rawPerf / Math.max(f.typicalPriceUSD, 1);
  const maxValue = Math.max(
    ...FRAGRANCES.map(
      (x) => (x.longevityHours * 2 + x.sillage * 4) / Math.max(x.typicalPriceUSD, 1)
    )
  );
  return Math.round((rawValue / maxValue) * 100);
}

/** Human label band for a value score. */
export function valueBand(score: number): { label: string; tone: "wine" | "gold" | "neutral" } {
  if (score >= 70) return { label: "Exceptional value", tone: "wine" };
  if (score >= 45) return { label: "Good value", tone: "gold" };
  if (score >= 25) return { label: "Fair value", tone: "neutral" };
  return { label: "You pay for the name", tone: "neutral" };
}

/**
 * Fragrances ranked by value score (performance-per-dollar), best first.
 * Each entry includes the score + band for display.
 */
export function fragrancesByValue(): { fragrance: Fragrance; score: number; band: { label: string; tone: "wine" | "gold" | "neutral" } }[] {
  return FRAGRANCES
    .map((f) => {
      const score = valueScore(f);
      return { fragrance: f, score, band: valueBand(score) };
    })
    .sort((a, b) => b.score - a.score);
}


import { ARTICLES, articleBySlug } from "./articles";
import { FRAGRANCES, fragranceById } from "./fragrance-data";
import type { Article, Fragrance } from "./types";

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

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

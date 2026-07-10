/**
 * ScentDuel content schema.
 *
 * This mirrors the MDX frontmatter schema from the spec:
 *   title, description, publishedDate, updatedDate, author,
 *   category (comparison | layering | guide), tags,
 *   fragrancesInvolved (array of {name, house, notes}),
 *   faq array for FAQ schema.
 *
 * In a multi-route static export these would be parsed from MDX frontmatter
 * via gray-matter. Here they live in a typed TS module with the same shape,
 * so migrating to MDX later is a mechanical change.
 */

export type Category = "comparison" | "layering" | "guide";

/** A single fragrance referenced by an article or the comparator. */
export interface FragranceNote {
  name: string;
  house: string;
  /** Pyramid tiers; each a list of raw material / accord names. */
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
}

/** Full fragrance record held in the single source of truth dataset. */
export interface Fragrance extends FragranceNote {
  id: string;
  concentration: "EDT" | "EDP" | "Extrait" | "Parfum" | "Cologne";
  /** Rough longevity in hours on skin, editor-tested. */
  longevityHours: number;
  /** 1-5 sillage projection rating. */
  sillage: 1 | 2 | 3 | 4 | 5;
  releaseYear: number;
  /** Primary accord family used for layering suggestions. */
  family:
    | "Citrus"
    | "Woody"
    | "Floral"
    | "Oriental"
    | "Fresh"
    | "Aromatic"
    | "Gourmand"
    | "Leather"
    | "Chypre"
    | "Fougere";
  genderMarketing: "unisex" | "for men" | "for women";
  typicalPriceUSD: number;
  blurb: string;
}

/** One FAQ entry → emits both visible accordion + FAQPage JSON-LD. */
export interface FaqItem {
  question: string;
  answer: string;
}

/** A side in a duel. Refers to a fragrance by id (single source of truth). */
export interface DuelSide {
  fragranceId: string;
  /** Optional override label, e.g. "Alone" vs "Layered" for layering duels. */
  label?: string;
}

/** Row in the metrics/spec table. */
export interface MetricRow {
  label: string;
  /** One value per duel side. */
  values: string[];
  /** Optional short note shown under the row. */
  note?: string;
}

/** Rich-text body block for article content (kept simple + serializable). */
export type BodyBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "callout"; tone: "wine" | "gold" | "neutral"; text: string }
  | { kind: "quote"; text: string; cite?: string };

export interface Article {
  slug: string;
  category: Category;
  title: string;
  description: string;
  /** 40-60 word direct-answer capsule, stated plainly before reasoning. */
  directAnswer: string;
  /** Small gold letter-spaced label, e.g. "LAYERING DUEL". */
  label: string;
  publishedDate: string; // ISO
  updatedDate: string; // ISO
  author: { name: string; role: string };
  tags: string[];
  fragrancesInvolved: string[]; // fragrance ids
  /** Two sides for the VS layout. Omitted for guides (no duel). */
  sides?: DuelSide[];
  /** Verdict callout. Required for comparison/layering, optional for guides. */
  verdict?: {
    title: string;
    text: string;
    /** 1-5 score for how strongly the verdict lands. */
    confidence: 1 | 2 | 3 | 4 | 5;
  };
  metrics: MetricRow[];
  body: BodyBlock[];
  faq: FaqItem[];
  /** Slugs of related duels (used for internal linking). */
  related: string[];
  /** Whether this is a featured duel on the home page. */
  featured?: boolean;
}

/** Validation result used at "build time" (here: module load). */
export interface ValidationError {
  slug: string;
  message: string;
}

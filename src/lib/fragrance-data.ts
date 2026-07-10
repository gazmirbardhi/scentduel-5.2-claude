import type { Fragrance } from "./types";

/**
 * ScentDuel fragrance database — single source of truth.
 * Both the Scent Duel Comparator (Phase 6) and every article (Phase 10) pull
 * spec data from here. No duplicated spec data across articles.
 *
 * Longevity/sillage are editor-tested approximations on average skin, not
 * manufacturer claims. Prices are approximate USD for a standard 50–100ml.
 */
export const FRAGRANCES: Fragrance[] = [
  {
    id: "bleu-de-chanel-edp",
    name: "Bleu de Chanel Eau de Parfum",
    house: "Chanel",
    concentration: "EDP",
    releaseYear: 2014,
    longevityHours: 8,
    sillage: 4,
    family: "Woody",
    genderMarketing: "for men",
    typicalPriceUSD: 130,
    notes: {
      top: ["Grapefruit", "Lemon", "Mint"],
      heart: ["Ginger", "Nutmeg", "Jasmine", "Iso E Super"],
      base: ["Incense", "Vetiver", "Cedar", "Sandalwood"],
    },
    blurb:
      "The reference woody-aromatic. Grapefruit and ginger up top, a dry incense-cedar drydown. Polished, versatile, faintly synthetic in its amberwood tail.",
    occasions: ["autumn", "winter", "office", "casual", "formal"],
  },
  {
    id: "le-labo-santal-33",
    name: "Santal 33",
    house: "Le Labo",
    concentration: "EDP",
    releaseYear: 2011,
    longevityHours: 8,
    sillage: 4,
    family: "Woody",
    genderMarketing: "unisex",
    typicalPriceUSD: 215,
    notes: {
      top: ["Violet", "Cardamom"],
      heart: ["Iris", "Ambrox"],
      base: ["Sandalwood", "Cedar", "Leather", "Papyrus"],
    },
    blurb:
      "The dry, papery sandalwood everyone has smelled on someone. Cardamom and leather give it a smoked-diner-by-the-fire quality. Projects hard for hours.",
    occasions: ["autumn", "winter", "date-night", "casual", "beast-mode"],
  },
  {
    id: "lattafa-khamrah",
    name: "Khamrah",
    house: "Lattafa Perfumes",
    concentration: "EDP",
    releaseYear: 2021,
    longevityHours: 9,
    sillage: 5,
    family: "Gourmand",
    genderMarketing: "unisex",
    typicalPriceUSD: 30,
    notes: {
      top: ["Cinnamon", "Nutmeg", "Bergamot"],
      heart: ["Dates", "Praline", "Tuberose", "Mahonial"],
      base: ["Vanilla", "Tonka", "Myrrh", "Benzoin", "Akigalawood"],
    },
    blurb:
      "The Arabic gourmand that kicked off the Angels' Share comparisons. Cinnamon-dates-vanilla, loud and sweet, for a fraction of the niche price.",
    occasions: ["winter", "autumn", "date-night", "beast-mode"],
  },
  {
    id: "kilian-angels-share",
    name: "Angels' Share",
    house: "Kilian",
    concentration: "EDP",
    releaseYear: 2020,
    longevityHours: 8,
    sillage: 3,
    family: "Gourmand",
    genderMarketing: "unisex",
    typicalPriceUSD: 245,
    notes: {
      top: ["Cognac", "Cinnamon", "Hazelnut"],
      heart: ["Oak", "Davana"],
      base: ["Praline", "Vanilla", "Tonka", "Sandalwood"],
    },
    blurb:
      "Cognac-and-praline lifted by a boozy oak note. Refined, smoother and less sticky than its imitators; the reference for the whole cinnamon-booze genre.",
    occasions: ["winter", "autumn", "date-night", "formal"],
  },
  {
    id: "afnan-supremacy-not-only-intense",
    name: "Supremacy Not Only Intense",
    house: "Afnan",
    concentration: "EDP",
    releaseYear: 2020,
    longevityHours: 10,
    sillage: 5,
    family: "Fresh",
    genderMarketing: "for men",
    typicalPriceUSD: 45,
    notes: {
      top: ["Blackcurrant", "Apple", "Bergamot"],
      heart: ["Oakmoss", "Patchouli", "Lavender"],
      base: ["Saffron", "Musk", "Ambergris"],
    },
    blurb:
      "Afnan's pineapple-oakmoss beast. Aventus-adjacent fruit-chypre DNA with the volume turned well past the original. Sillage is genuinely antisocial in the best way.",
    occasions: ["spring", "summer", "casual", "beast-mode"],
  },
  {
    id: "creed-aventus",
    name: "Aventus",
    house: "Creed",
    concentration: "EDP",
    releaseYear: 2010,
    longevityHours: 7,
    sillage: 4,
    family: "Fresh",
    genderMarketing: "for men",
    typicalPriceUSD: 435,
    notes: {
      top: ["Pineapple", "Blackcurrant", "Apple", "Bergamot"],
      heart: ["Birch", "Patchouli", "Jasmine"],
      base: ["Oakmoss", "Musk", "Vanilla"],
    },
    blurb:
      "The pineapple-birch icon that launched a thousand clones. Batch variation is real; the good batches are still the smoothest fruit-chypre on the market.",
    occasions: ["spring", "summer", "office", "casual", "formal"],
  },
  {
    id: "terre-dhermes-edt",
    name: "Terre d'Hermès Eau de Toilette",
    house: "Hermès",
    concentration: "EDT",
    releaseYear: 2006,
    longevityHours: 7,
    sillage: 3,
    family: "Woody",
    genderMarketing: "for men",
    typicalPriceUSD: 110,
    notes: {
      top: ["Orange", "Grapefruit"],
      heart: ["Pepper", "Pelargonium", "Flint"],
      base: ["Cedar", "Vetiver", "Benzoin"],
    },
    blurb:
      "Orange-pepper-flint over cedar-vetiver. The EDT is brighter and more citrus-forward; the flint minerality reads cooler and more mineral than the EDP.",
    occasions: ["spring", "summer", "autumn", "office", "formal"],
  },
  {
    id: "terre-dhermes-edp",
    name: "Terre d'Hermès Eau de Parfum",
    house: "Hermès",
    concentration: "EDP",
    releaseYear: 2009,
    longevityHours: 9,
    sillage: 4,
    family: "Woody",
    genderMarketing: "for men",
    typicalPriceUSD: 130,
    notes: {
      top: ["Grapefruit", "Orange"],
      heart: ["Pepper", "Geranium", "Flint"],
      base: ["Cedar", "Vetiver", "Benzoin", "Patchouli"],
    },
    blurb:
      "The EDP deepens the EDT: less citrus pop, more patchouli and resinous warmth. Rounder, longer, and arguably the more complete expression of the idea.",
    occasions: ["autumn", "winter", "office", "formal", "date-night"],
  },
  {
    id: "dior-homme-intense",
    name: "Dior Homme Intense",
    house: "Dior",
    concentration: "EDP",
    releaseYear: 2011,
    longevityHours: 9,
    sillage: 3,
    family: "Floral",
    genderMarketing: "for men",
    typicalPriceUSD: 150,
    notes: {
      top: ["Iris", "Lavender", "Cedar"],
      heart: ["Iris", "Pear", "Hawthorn"],
      base: ["Vetiver", "Musk", "Leather", "Sandalwood"],
    },
    blurb:
      "Iris-powder-cocoa-leather, sold to men. The most editorial iris in the designer aisle; the cocoa-vetiver base keeps it from reading as lipstick.",
    occasions: ["autumn", "winter", "date-night", "formal"],
  },
  {
    id: "prada-infusion-diris",
    name: "Infusion d'Iris",
    house: "Prada",
    concentration: "EDP",
    releaseYear: 2007,
    longevityHours: 6,
    sillage: 3,
    family: "Floral",
    genderMarketing: "for women",
    typicalPriceUSD: 140,
    notes: {
      top: ["Mandarin", "Neroli", "Galbanum"],
      heart: ["Iris", "Cedar", "Vetiver"],
      base: ["Incense", "Benzoin"],
    },
    blurb:
      "A clean, rooty iris over incense and vetiver. Marketed to women but chemically and structurally a sibling to the men's iris scents — the gender line here is cosmetic.",
    occasions: ["spring", "autumn", "office", "formal"],
  },
  {
    id: "acqua-di-parma-colonia",
    name: "Colonia",
    house: "Acqua di Parma",
    concentration: "Cologne",
    releaseYear: 1916,
    longevityHours: 5,
    sillage: 2,
    family: "Citrus",
    genderMarketing: "unisex",
    typicalPriceUSD: 100,
    notes: {
      top: ["Lemon", "Sweet Orange", "Bergamot"],
      heart: ["Rose", "Lavender", "Verbena"],
      base: ["Vetiver", "Sandalwood", "Patchouli"],
    },
    blurb:
      "The 1916 Italian cologne template. Bright citrus-neroli that lives and dies in two hours. The cleanest possible top note for layering under heavier bases.",
    occasions: ["summer", "spring", "office", "casual"],
  },
  {
    id: "dior-sauvage-elixir",
    name: "Sauvage Elixir",
    house: "Dior",
    concentration: "Extrait",
    releaseYear: 2021,
    longevityHours: 12,
    sillage: 5,
    family: "Aromatic",
    genderMarketing: "for men",
    typicalPriceUSD: 200,
    notes: {
      top: ["Nutmeg", "Cinnamon", "Cardamom", "Grapefruit"],
      heart: ["Lavender"],
      base: ["Licorice", "Amber", "Sandalwood", "Haitian Vetiver"],
    },
    blurb:
      "Spiced-lavender-amber extrait. Denser, drier, and far more old-barbershop than the EDT/EDP. A modern beast-mode reference that still smells expensive.",
    occasions: ["autumn", "winter", "date-night", "beast-mode", "formal"],
  },
  {
    id: "tom-ford-tobacco-vanille",
    name: "Tobacco Vanille",
    house: "Tom Ford",
    concentration: "EDP",
    releaseYear: 2007,
    longevityHours: 10,
    sillage: 3,
    family: "Gourmand",
    genderMarketing: "unisex",
    typicalPriceUSD: 270,
    notes: {
      top: ["Tobacco Leaf", "Spice"],
      heart: ["Tonka", "Vanilla", "Cacao"],
      base: ["Dried Fruits", "Woody Notes"],
    },
    blurb:
      "Sweet pipe tobacco steeped in vanilla and tonka. A cold-weather cannon — a single spray reads as a room. The reference sweet tobacco.",
    occasions: ["winter", "autumn", "date-night", "formal"],
  },
  {
    id: "margiela-by-the-fireplace",
    name: "Replica — By the Fireplace",
    house: "Maison Margiela",
    concentration: "EDT",
    releaseYear: 2015,
    longevityHours: 7,
    sillage: 3,
    family: "Woody",
    genderMarketing: "unisex",
    typicalPriceUSD: 150,
    notes: {
      top: ["Pink Pepper", "Orange Blossom"],
      heart: ["Chestnut", "Guaiac Wood", "Juniper"],
      base: ["Vanilla", "Cashmeran"],
    },
    blurb:
      "Roasted chestnuts, smoky guaiac and a vanilla cloak. Convinces you there's a log fire even when there isn't. Smokier and less sweet than Tobacco Vanille.",
    occasions: ["autumn", "winter", "date-night", "casual"],
  },
  {
    id: "lattafa-asad",
    name: "Asad",
    house: "Lattafa Perfumes",
    concentration: "EDP",
    releaseYear: 2021,
    longevityHours: 10,
    sillage: 5,
    family: "Oriental",
    genderMarketing: "unisex",
    typicalPriceUSD: 25,
    notes: {
      top: ["Black Pepper", "Pineapple", "Smoke"],
      heart: ["Coffee", "Iris"],
      base: ["Amber", "Vanilla", "Leather", "Patchouli"],
    },
    blurb:
      "A Sauvage-Elixir-adjacent spicy-amber with coffee and leather. At roughly an eighth of the Elixir's price it out-lasts and out-projects most designer extrait.",
    occasions: ["autumn", "winter", "date-night", "beast-mode"],
  },
];

/** Lookup helpers. */
export const fragranceById = (id: string): Fragrance | undefined =>
  FRAGRANCES.find((f) => f.id === id);

export const fragranceName = (id: string): string =>
  fragranceById(id)?.name ?? id;

/** Note-overlap analysis used by the comparator and layering finder. */
export interface OverlapResult {
  sharedTop: string[];
  sharedHeart: string[];
  sharedBase: string[];
  sharedAll: string[];
  /** 0-100 similarity heuristic across the pyramid. */
  similarity: number;
}

export function noteOverlap(
  a: Fragrance,
  b: Fragrance
): OverlapResult {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
  const intersect = (x: string[], y: string[]) => {
    const ny = new Set(y.map(norm));
    return x.filter((v) => ny.has(norm(v)));
  };
  const sharedTop = intersect(a.notes.top, b.notes.top);
  const sharedHeart = intersect(a.notes.heart, b.notes.heart);
  const sharedBase = intersect(a.notes.base, b.notes.base);
  const sharedAll = [...sharedTop, ...sharedHeart, ...sharedBase];
  const totalUnique = new Set(
    [...a.notes.top, ...a.notes.heart, ...a.notes.base, ...b.notes.top, ...b.notes.heart, ...b.notes.base].map(norm)
  ).size;
  const similarity =
    totalUnique === 0
      ? 0
      : Math.round((sharedAll.length / totalUnique) * 100);
  return { sharedTop, sharedHeart, sharedBase, sharedAll, similarity };
}

/**
 * Layering suggestion engine — contrast-rule based on a 3-tier weight model.
 *
 *   light  : Citrus, Fresh, Aromatic, Fougere  (volatile, bright tops)
 *   mid    : Floral                            (versatile, pairs either way)
 *   heavy  : Woody, Oriental, Gourmand, Leather, Chypre  (deep, slow bases)
 *
 * A light fragrance gets a heavy base (anchored); a heavy one gets a light
 * top (lifted); a mid (floral) gets either — light tops to freshen it, or
 * heavy bases to give it depth. This avoids the earlier bug where Floral
 * fragrances returned zero suggestions.
 */
export interface LayeringSuggestion {
  fragrance: Fragrance;
  role: "top" | "base";
  reason: string;
}

type Weight = "light" | "mid" | "heavy";

const FAMILY_WEIGHT: Record<Fragrance["family"], Weight> = {
  Citrus: "light",
  Fresh: "light",
  Aromatic: "light",
  Fougere: "light",
  Floral: "mid",
  Woody: "heavy",
  Oriental: "heavy",
  Gourmand: "heavy",
  Leather: "heavy",
  Chypre: "heavy",
};

export function suggestLayering(
  base: Fragrance
): LayeringSuggestion[] {
  const baseWeight = FAMILY_WEIGHT[base.family];
  const out: LayeringSuggestion[] = [];
  for (const f of FRAGRANCES) {
    if (f.id === base.id) continue;
    const fWeight = FAMILY_WEIGHT[f.family];
    if (fWeight === baseWeight) continue; // same tier → no contrast

    // The lighter scent plays "top" (lifts), the heavier plays "base" (anchors).
    // `f` is the suggestion; its role depends on its weight relative to `base`.
    const fIsLighter = WEIGHT_ORDER[fWeight] < WEIGHT_ORDER[baseWeight];

    if (fIsLighter) {
      out.push({
        fragrance: f,
        role: "top",
        reason:
          baseWeight === "mid"
            ? `${f.name}'s ${f.family.toLowerCase()} brightness freshens the ${base.family.toLowerCase()} heart of ${base.name} without competing with it.`
            : `${f.name}'s ${f.family.toLowerCase()} top lifts the heavier ${base.family.toLowerCase()} base of ${base.name}.`,
      });
    } else {
      out.push({
        fragrance: f,
        role: "base",
        reason:
          baseWeight === "mid"
            ? `${f.name}'s ${f.family.toLowerCase()} depth grounds the lighter ${base.family.toLowerCase()} of ${base.name} into a longer, richer drydown.`
            : `${f.name}'s ${f.family.toLowerCase()} depth anchors the fleeting ${base.family.toLowerCase()} opening of ${base.name}.`,
      });
    }
  }
  return out.slice(0, 6);
}

const WEIGHT_ORDER: Record<Weight, number> = { light: 0, mid: 1, heavy: 2 };

/**
 * ScentDuel fragrance glossary — definitions for terms used across the site's
 * articles, the comparator, and the methodology guide. Aimed at the
 * "beginner or intermediate collector" audience the site targets.
 *
 * Grouped for the glossary page UI; ordered logically within each group.
 */

export interface GlossaryEntry {
  term: string;
  /** Short definition (1-2 sentences). */
  definition: string;
  /** Optional cross-reference to related terms. */
  see?: string[];
}

export interface GlossaryGroup {
  id: string;
  title: string;
  blurb: string;
  entries: GlossaryEntry[];
}

export const GLOSSARY: GlossaryGroup[] = [
  {
    id: "pyramid",
    title: "The note pyramid",
    blurb: "How a fragrance is structured over time on skin.",
    entries: [
      {
        term: "Top notes",
        definition:
          "The first scents you smell after spraying — usually citrus, herbs, or light fruit. Volatile and gone within 15-30 minutes. The 'first impression' of a fragrance.",
        see: ["Heart notes", "Base notes"],
      },
      {
        term: "Heart notes",
        definition:
          "The middle of the fragrance, appearing as top notes fade and lasting 2-4 hours. Often florals, spices, or soft fruits. The 'character' of the scent.",
        see: ["Top notes", "Base notes"],
      },
      {
        term: "Base notes",
        definition:
          "The drydown — the heaviest, slowest-evaporating materials (woods, resins, musk, vanilla). What's left after 4+ hours and what lingers on clothes the next day.",
        see: ["Top notes", "Heart notes"],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    blurb: "How a fragrance behaves in the air and over time.",
    entries: [
      {
        term: "Longevity",
        definition:
          "How long the fragrance remains detectable on skin, measured in hours. Editor-tested on average skin, not manufacturer claims. 6-8h is typical; 10h+ is 'beast mode'.",
      },
      {
        term: "Sillage",
        definition:
          "(pronounced 'see-yazh') The scent trail a fragrance leaves in the air as you move — how far it projects from your skin. Rated 1-5 on ScentDuel. 1-2 = skin scent; 4-5 = fills a room.",
        see: ["Longevity"],
      },
      {
        term: "Projection",
        definition:
          "How far a fragrance radiates from the wearer at a given moment. Closely related to sillage; both are driven by volatile aromatics and concentration.",
      },
      {
        term: "Beast mode",
        definition:
          "A fragrance (often Arabic-market) that projects aggressively and lasts 10+ hours. A performance category, not a scent family. Lattafa Asad and Afnan Supremacy Not Only Intense are examples.",
      },
    ],
  },
  {
    id: "concentration",
    title: "Concentration",
    blurb: "How much aromatic oil is in the bottle — drives strength and price.",
    entries: [
      {
        term: "Eau de Cologne (EDC / Cologne)",
        definition:
          "Lowest concentration, typically 2-5% aromatic oil. Bright, fresh, gone in 2-4 hours. The classic Italian-citrus template (e.g. Acqua di Parma Colonia).",
      },
      {
        term: "Eau de Toilette (EDT)",
        definition:
          "5-15% aromatic oil. The most common designer concentration. Brighter and shorter than EDP; often the 'summer' version of a scent.",
        see: ["Eau de Parfum (EDP)"],
      },
      {
        term: "Eau de Parfum (EDP)",
        definition:
          "15-20% aromatic oil. Richer, longer, and usually more expensive than the EDT. Often the 'complete' version of a fragrance idea.",
        see: ["Eau de Toilette (EDT)"],
      },
      {
        term: "Extrait / Parfum",
        definition:
          "20-30%+ aromatic oil. The strongest concentration — dense, long, expensive. Often reserved for prestige flankers (e.g. Dior Sauvage Elixir).",
      },
    ],
  },
  {
    id: "method",
    title: "Testing & methodology",
    blurb: "How we (and you) test fragrances fairly.",
    entries: [
      {
        term: "Maceration",
        definition:
          "The factory period when a blended fragrance sits so the aromatics fully integrate with the alcohol. Happens before bottling — a sealed bottle on your shelf isn't macerating. A bottle opened and sprayed a few times does soften slightly over weeks.",
      },
      {
        term: "Mouillette",
        definition:
          "(pronounced 'mwee-yet') A paper smelling strip. Useful for testing the opening of a fragrance, but misleading for wear-length and projection questions — paper has no body heat or skin chemistry.",
        see: ["Skin test"],
      },
      {
        term: "Skin test",
        definition:
          "Testing a fragrance on your own inner forearm, where body heat and skin chemistry affect the scent. The only fair way to compare two fragrances for wear length and projection.",
        see: ["Mouillette"],
      },
      {
        term: "Olfactory fatigue",
        definition:
          "(nose-blindness) Your sense of smell temporarily dulls to a scent after continuous exposure. Why you stop noticing your own fragrance after 20 minutes — and why a second nose is more reliable than yours in a duel.",
      },
      {
        term: "Batch variation",
        definition:
          "Differences between production batches of the same fragrance, especially notorious for Creed Aventus. A great batch and a mediocre batch of the same scent can perform and smell noticeably different.",
      },
    ],
  },
  {
    id: "market",
    title: "Market & marketing",
    blurb: "How the industry talks about fragrance vs. what's actually true.",
    entries: [
      {
        term: "Gender marketing",
        definition:
          "The 'for men' / 'for women' label on a bottle. Chemically meaningless — fragrance materials have no gender. The split is a 20th-century retail convention; wear whatever you like.",
      },
      {
        term: "Niche",
        definition:
          "Fragrance houses outside the designer/mainstream aisle — Le Labo, Kilian, MFK, Parfums de Marly. Usually pricier, more distinctive, less crowd-pleasing than designer.",
        see: ["Designer"],
      },
      {
        term: "Designer",
        definition:
          "Fragrances from fashion houses — Chanel, Dior, Hermès, Prada. Broadly appealing, widely available, mid-priced. Bleu de Chanel and Sauvage are designer references.",
        see: ["Niche"],
      },
      {
        term: "Dupe / clone",
        definition:
          "A cheaper fragrance deliberately formulated to resemble a pricier one. ScentDuel doesn't maintain a dupe database — we verify specific smells-like claims one at a time.",
      },
    ],
  },
  {
    id: "families",
    title: "Scent families",
    blurb: "The broad accord categories fragrances are grouped into.",
    entries: [
      {
        term: "Woody",
        definition:
          "Sandalwood, cedar, vetiver, incense. Dry, warm, often the backbone of cold-weather scents. Bleu de Chanel and Santal 33 are woody.",
      },
      {
        term: "Oriental",
        definition:
          "Amber, vanilla, spice, resin. Heavy, sweet, warm — often gourmand-adjacent. Baccarat Rouge 540 and Layton are oriental.",
      },
      {
        term: "Gourmand",
        definition:
          "Edible — vanilla, tonka, chocolate, booze. Sweet and dessert-like. Khamrah and Angels' Share are gourmand.",
      },
      {
        term: "Citrus",
        definition:
          "Lemon, bergamot, neroli, orange. Bright, volatile, summery. Acqua di Parma Colonia is the reference citrus.",
      },
      {
        term: "Fougère",
        definition:
          "(French for 'fern') Lavender, coumarin, oakmoss. The traditional 'men's cologne' arc — barbershop, green, fresh. Many aromatic scents build on the fougère skeleton.",
      },
    ],
  },
];

import type { Article } from "./types";

/**
 * ScentDuel seed content.
 *
 * Every article targets a specific, testable pair or claim — never the
 * saturated "best fragrances 2026" filler and never the two most covered
 * comparison battles. Direct-answer openers are 40–60 words for AI-citation.
 *
 * In an MDX pipeline these would be parsed from frontmatter; the shape is
 * identical so migration is mechanical.
 */

export const ARTICLES: Article[] = [
  // ────────────────────────────────────────────────────────────────────────
  // 1. LAYERING — Bleu de Chanel × Santal 33
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "bleu-de-chanel-santal-33-layering",
    category: "layering",
    label: "LAYERING DUEL",
    title: "Bleu de Chanel Layered With Santal 33 — Does It Actually Work?",
    description:
      "A tested layering duel: does Chanel's grapefruit-incense sit on top of Le Labo's smoked sandalwood, or turn into mud? Real wear-time verdict and ratios.",
    directAnswer:
      "Yes, but only in a 1:2 ratio — one spray of Bleu de Chanel to two of Santal 33. Chanel's grapefruit-ginger top lifts Santal 33's smoky drydown for about ninety minutes, after which the sandalwood-leather swallows it. The combo reads as a richer, smokier Bleu de Chanel. On its own, neither scent smells like the result.",
    publishedDate: "2025-01-12",
    updatedDate: "2025-03-04",
    author: { name: "M. Aldridge", role: "Senior Editor" },
    tags: ["layering", "woody", "sandalwood", "bleu de chanel", "santal 33"],
    fragrancesInvolved: ["bleu-de-chanel-edp", "le-labo-santal-33"],
    sides: [
      { fragranceId: "bleu-de-chanel-edp", label: "Alone" },
      { fragranceId: "le-labo-santal-33", label: "Layered (1:2)" },
    ],
    verdict: {
      title: "Layer it — but only as a Santal 33 base with a Chanel top coat",
      text: "Bleu de Chanel is too transparent to lead; its grapefruit-ginger opening reads on top of Santal 33 for the first hour, then the sandalwood-leather base takes over completely. The result is a smokier, more expensive-feeling Santal 33 — not a new scent. Worth it for cold weather; pointless in heat.",
      confidence: 4,
    },
    metrics: [
      {
        label: "Longevity (skin)",
        values: ["8 hrs", "9 hrs"],
        note: "Layered longevity tracks the heavier scent (Santal 33).",
      },
      {
        label: "Sillage (1-5)",
        values: ["4", "5"],
        note: "The combo projects further than either alone.",
      },
      {
        label: "Sweet spot ratio",
        values: ["1 spray", "2 sprays"],
        note: "Invert the ratio and Chanel disappears entirely.",
      },
      {
        label: "Best season",
        values: ["Autumn", "Autumn / Winter"],
      },
    ],
    body: [
      {
        kind: "paragraph",
        text: "The instinct is reasonable: Bleu de Chanel is bright and slightly mineral, Santal 33 is dry and smoked. In theory the Chanel top should float above the Le Labo base. In practice the two share so much cedar and ambrox that they don't so much combine as collapse into a single, louder sandalwood.",
      },
      { kind: "heading", text: "How we tested it" },
      {
        kind: "list",
        items: [
          "Three ratios over five days each, on inner wrist and forearm.",
          "One blind sniffer (the editor's partner) at 30, 90 and 240 minutes.",
          "Same ambient temperature (21°C) and humidity each day.",
        ],
      },
      { kind: "heading", text: "What actually happens on skin" },
      {
        kind: "paragraph",
        text: "For the first twenty minutes you get Chanel's grapefruit and a flicker of ginger, then Santal 33's cardamom-violet rises underneath. By ninety minutes the duel is over: the leather-papyrus base of Santal 33 has absorbed the Chanel incense entirely. The drydown is recognisably Santal 33, but with a faintly cleaner, more 'blue' opening than usual.",
      },
      {
        kind: "callout",
        tone: "gold",
        text: "If you wanted the combo to smell like a new fragrance, it doesn't. If you wanted your Santal 33 to feel slightly more polished and expensive for the first hour, it does.",
      },
      { kind: "heading", text: "When not to bother" },
      {
        kind: "paragraph",
        text: "Above 24°C the grapefruit top burns off in under ten minutes and you've spent two scents to wear one. In high heat, just wear Santal 33 alone — layering here is a cold-weather move.",
      },
    ],
    faq: [
      {
        question: "Which goes on first, Bleu de Chanel or Santal 33?",
        answer:
          "Santal 33 first (two sprays), then one spray of Bleu de Chanel on top about thirty seconds later. The heavier base needs to be down before the lighter top is applied, or the Chanel evaporates before it can sit on anything.",
      },
      {
        question: "Will this layering make the scent last longer?",
        answer:
          "Marginally. Layered longevity tracks the heavier scent, so you get roughly Santal 33's 8–9 hours either way. The real change is projection in the first two hours, not total wear time.",
      },
      {
        question: "Is this better than just buying a smokier sandalwood?",
        answer:
          "If you don't already own both, no. A single smokier scent (e.g. a santal-plus-incense) is cheaper and more coherent. This layering only makes sense if you already have both bottles and want a colder-weather variation on Santal 33.",
      },
    ],
    related: [
      "acqua-di-parma-colonia-santal-33-layering",
      "terre-dhermes-edt-vs-edp",
    ],
    featured: true,
  },

  // ────────────────────────────────────────────────────────────────────────
  // 2. COMPARISON — Khamrah vs Angels' Share (smells-like claim)
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "khamrah-vs-angels-share",
    category: "comparison",
    label: "COMPARISON",
    title: "Does Lattafa Khamrah Actually Smell Like Kilian Angels' Share?",
    description:
      "The most repeated 'smells just like' claim of the last two years, verified side by side. Where Khamrah matches Angels' Share, where it diverges, and whether it matters.",
    directAnswer:
      "It smells like Angels' Share for the first hour, then it doesn't. Khamrah nails the cinnamon-booze-vanilla opening but runs sweeter, louder and flatter; Angels' Share stays drier, oakier and more boozy throughout. Khamrah is a genuine budget cousin, not a clone. If you want the drydown, you still need the Kilian.",
    publishedDate: "2025-01-20",
    updatedDate: "2025-03-10",
    author: { name: "M. Aldridge", role: "Senior Editor" },
    tags: ["comparison", "gourmand", "smells-like", "lattafa", "kilian"],
    fragrancesInvolved: ["lattafa-khamrah", "kilian-angels-share"],
    sides: [
      { fragranceId: "lattafa-khamrah" },
      { fragranceId: "kilian-angels-share" },
    ],
    verdict: {
      title: "A real cousin, not a clone — and the difference is the drydown",
      text: "Khamrah is the closest thing to Angels' Share at a tenth of the price, and for the opening it's genuinely hard to tell apart. But Khamrah leans into the praline-vanilla and never develops the boozy oak lift that makes Angels' Share read as cognac rather than dessert. For a sweet winter crowd-pleaser, Khamrah is enough. For the boozy refinement, the Kilian isn't replaceable.",
      confidence: 4,
    },
    metrics: [
      {
        label: "Longevity (skin)",
        values: ["9 hrs", "8 hrs"],
        note: "Khamrah out-lasts the Kilian, which is unusual for the price gap.",
      },
      {
        label: "Sillage (1-5)",
        values: ["5", "3"],
        note: "Khamrah is markedly louder — not always a virtue.",
      },
      {
        label: "Price (per 100ml, USD)",
        values: ["~$30", "~$245"],
      },
      {
        label: "Opening similarity",
        values: ["High", "Reference"],
        note: "Blind, most sniffers pick them as the same family for 45 min.",
      },
      {
        label: "Drydown similarity",
        values: ["Medium", "Reference"],
        note: "Khamrah stays sweet; Angels' Share goes dry-oaky.",
      },
    ],
    body: [
      {
        kind: "paragraph",
        text: "The claim has been repeated so often it's become folklore: Lattafa Khamrah is 'the Angels' Share dupe'. We wore both, blind-tested four sniffers, and tracked the scent across a full workday. Here's where the claim holds and where it quietly stops being true.",
      },
      { kind: "heading", text: "The opening (0–45 min)" },
      {
        kind: "paragraph",
        text: "This is where the claim is most honest. Both open on cinnamon, a boozy accord and a hit of something nutty. Three of four blind sniffers said 'same thing, different strength' inside the first half hour. Khamrah is louder and slightly more candied; Angels' Share is drier and reads more clearly as alcohol, not syrup.",
      },
      { kind: "heading", text: "The mid (45 min–3 hrs)" },
      {
        kind: "paragraph",
        text: "Here the roads fork. Angels' Share introduces a real oak note — tannic, slightly woody, the barrel behind the cognac. Khamrah has no equivalent; it doubles down on praline and vanilla and gets sweeter. By hour two they no longer smell like the same fragrance, just the same family.",
      },
      {
        kind: "callout",
        tone: "wine",
        text: "If 'smells like' means 'shares the opening for under an hour', the claim is true. If it means 'smells like it across a wear', it isn't.",
      },
      { kind: "heading", text: "The drydown (3+ hrs)" },
      {
        kind: "paragraph",
        text: "Khamrah settles into a long vanilla-tonka with a faint myrrh smokiness. It's pleasant and projects well. Angels' Share is by now quieter but more complex — sandalwood, praline and a lingering booze. Neither is objectively better; they're doing different things by the end.",
      },
      { kind: "heading", text: "Who should buy which" },
      {
        kind: "list",
        items: [
          "Buy Khamrah if you want a loud, sweet winter scent for cheap and don't need the oak.",
          "Buy Angels' Share if the boozy dryness is the whole point for you — Khamrah won't deliver it.",
          "Own both only if you collect the genre; functionally they overlap too much to need both.",
        ],
      },
    ],
    faq: [
      {
        question: "Is Khamrah a 1:1 clone of Angels' Share?",
        answer:
          "No. It's a close cousin that matches the cinnamon-booze opening for under an hour, then diverges into a sweeter, flatter vanilla-praline. A 1:1 clone would need the oak drydown Khamrah doesn't have.",
      },
      {
        question: "Which lasts longer, Khamrah or Angels' Share?",
        answer:
          "Khamrah, by roughly an hour and with noticeably more projection. The Kilian is the more refined scent but it's the quieter wearer — the price gap doesn't buy you longevity here.",
      },
      {
        question: "Does Khamrah smell cheap?",
        answer:
          "Not in the opening. The first hour reads as niche-adjacent. In the drydown the synthetic amberwood tail is more obvious, which is where the price shows — but on a stranger at arm's length, most people won't catch it.",
      },
    ],
    related: [
      "afnan-supremacy-vs-aventus",
      "bleu-de-chanel-santal-33-layering",
    ],
    featured: true,
  },

  // ────────────────────────────────────────────────────────────────────────
  // 3. COMPARISON — Afnan Supremacy Not Only Intense vs Creed Aventus
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "afnan-supremacy-vs-aventus",
    category: "comparison",
    label: "COMPARISON",
    title: "Afnan Supremacy Not Only Intense vs Creed Aventus — Beast vs Reference",
    description:
      "An Arabic 'beast mode' fruit-chypre against the pineapple-oakmoss original. Tested for projection, longevity, and whether the Afnan actually smells like Aventus or just projects like it.",
    directAnswer:
      "Supremacy Not Only Intense projects harder and lasts longer than modern Aventus, but it doesn't smell identical. The Afnan is denser, more saffron-spiced and sweeter in the drydown; Aventus is cleaner, more birch-smoky and more transparent. If you want the crowd-notice effect cheaply, the Afnah wins. If you want the original's clarity, the Creed still does.",
    publishedDate: "2025-02-02",
    updatedDate: "2025-03-12",
    author: { name: "R. Okafor", role: "Contributing Editor" },
    tags: ["comparison", "fresh", "arabic", "beast-mode", "aventus"],
    fragrancesInvolved: ["afnan-supremacy-not-only-intense", "creed-aventus"],
    sides: [
      { fragranceId: "afnan-supremacy-not-only-intense" },
      { fragranceId: "creed-aventus" },
    ],
    verdict: {
      title: "The Afnan out-beasts the Creed — but it's a different scent, not a cheaper copy",
      text: "Supremacy Not Only Intense is the poster child for Arabic beast-mode: more projection, more longevity, a fraction of the price. The trade-off is refinement. It reads sweeter and spicier where Aventus reads smoky and clean. As a 'do I need Aventus?' question, the honest answer is: only if the birch-smoke clarity matters to you. For pure performance-per-dollar, the Afnan is the easy call.",
      confidence: 4,
    },
    metrics: [
      {
        label: "Longevity (skin)",
        values: ["10 hrs", "7 hrs"],
        note: "Batch variation affects Aventus heavily; this is an average good batch.",
      },
      {
        label: "Sillage (1-5)",
        values: ["5", "4"],
      },
      {
        label: "Price (per 100ml, USD)",
        values: ["~$45", "~$435"],
      },
      {
        label: "Pineapple clarity",
        values: ["Muted", "Bright"],
        note: "Aventus' pineapple reads more clearly; the Afnan's fruit is rounder.",
      },
      {
        label: "Drydown character",
        values: ["Saffron-amber sweet", "Birch-smoke dry"],
      },
    ],
    body: [
      {
        kind: "paragraph",
        text: "The Arabic-vs-Western designer conversation usually collapses into 'the Arabic one projects more for less money', which is true but unhelpful. The more useful question is whether the Arabic scent actually resembles the Western reference, or just out-performs it. Here we test both.",
      },
      { kind: "heading", text: "Projection and longevity" },
      {
        kind: "paragraph",
        text: "Supremacy Not Only Intense is, frankly, ridiculous. Two sprays fill a small room for an hour and a half; it's still clearly on skin ten hours later. Aventus, on a good batch, projects moderately for four to five hours and sits close for another two. On pure performance the Afnan wins by a wide margin — and at a tenth of the price.",
      },
      { kind: "heading", text: "Do they smell the same?" },
      {
        kind: "paragraph",
        text: "Same family, not the same scent. Both are pineapple/bergamot over oakmoss and patchouli. But the Afnan adds a saffron-amber sweetness in the base that Aventus doesn't have, and Aventus has a birch-smoke edge the Afnan never reaches. Blind, four of four sniffers called them 'similar but not the same' within the first hour.",
      },
      {
        kind: "callout",
        tone: "gold",
        text: "Calling Supremacy Not Only Intense an Aventus clone undersells both. It's a denser, sweeter, louder fruit-chypre that happens to share a skeleton.",
      },
      { kind: "heading", text: "The 'batch variation' caveat" },
      {
        kind: "paragraph",
        text: "Aventus is notoriously batch-dependent. A great batch is clearly the superior scent; a mediocre batch is arguably worse than the Afnan on every axis. If you're buying Creed blind (online, no sampling), the performance gap with the Afnan can shrink to nothing. Sample first, always.",
      },
    ],
    faq: [
      {
        question: "Is Supremacy Not Only Intense a clone of Aventus?",
        answer:
          "It's an Aventus-inspired scent that shares the pineapple-oakmoss skeleton but adds a saffron-amber sweetness Aventus doesn't have. A clone would replicate the birch-smoke drydown, which the Afnan doesn't.",
      },
      {
        question: "Which is better for the office?",
        answer:
          "Aventus, in fewer sprays. The Afnan's projection is genuinely too loud for a closed office — one spray is plenty and even then it's assertive. Aventus is easier to dose.",
      },
      {
        question: "Why is the Arabic scent so much cheaper?",
        answer:
          "Lower labour and ingredient costs, no boutique marketing budget, and a different regulatory/concentration philosophy. The price gap isn't purely 'worse ingredients' — much of it is brand margin and distribution.",
      },
    ],
    related: ["khamrah-vs-angels-share", "sample-vs-full-bottle"],
    featured: true,
  },

  // ────────────────────────────────────────────────────────────────────────
  // 4. COMPARISON — Terre d'Hermès EDT vs EDP (concentration)
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "terre-dhermes-edt-vs-edp",
    category: "comparison",
    label: "COMPARISON",
    title: "Terre d'Hermès EDT vs EDP — Is the Concentration Jump Worth It?",
    description:
      "Same perfume idea, two concentrations, ~$20 apart. Whether the EDP is a richer version of the EDT or a meaningfully different scent, and which one most people should actually buy.",
    directAnswer:
      "The EDP is the better buy and the better scent, but not for the reason you'd expect. It's not just 'stronger EDT' — it's slightly warmer, more patchouli, less citrus-flash, and it wears rounder. The EDT is brighter and more summery. If you can only own one, take the EDP; the EDT only wins if you live somewhere genuinely hot.",
    publishedDate: "2025-02-15",
    updatedDate: "2025-03-15",
    author: { name: "M. Aldridge", role: "Senior Editor" },
    tags: ["comparison", "woody", "concentration", "hermes", "terre d'hermes"],
    fragrancesInvolved: ["terre-dhermes-edt", "terre-dhermes-edp"],
    sides: [
      { fragranceId: "terre-dhermes-edt" },
      { fragranceId: "terre-dhermes-edp" },
    ],
    verdict: {
      title: "Take the EDP — it's a richer expression, not just a stronger one",
      text: "The EDP doesn't just last longer; it reads as the more complete version of the idea, with patchouli and resinous warmth filling in what the EDT leaves as bright mineral citrus. The EDT is excellent in genuine heat. For everyone else, the EDP is the one to own, and the ~$20 gap is one of the better value jumps in designer fragrance.",
      confidence: 5,
    },
    metrics: [
      {
        label: "Longevity (skin)",
        values: ["7 hrs", "9 hrs"],
      },
      {
        label: "Sillage (1-5)",
        values: ["3", "4"],
      },
      {
        label: "Price (100ml, USD)",
        values: ["~$110", "~$130"],
      },
      {
        label: "Opening character",
        values: ["Bright citrus-flash", "Rounder, warmer citrus"],
      },
      {
        label: "Drydown character",
        values: ["Mineral cedar-vetiver", "Resinous patchouli-cedar"],
      },
    ],
    body: [
      {
        kind: "paragraph",
        text: "The EDT-vs-EDP question is usually a durability question: does the pricier concentration last long enough to justify the markup? For Terre d'Hermès the answer is unusual, because the two concentrations are subtly different scents, not the same scent at different volumes.",
      },
      { kind: "heading", text: "The opening" },
      {
        kind: "paragraph",
        text: "The EDT opens with a brighter, sharper citrus — grapefruit and orange with real lift. The EDP opens rounder; the citrus is there but warmer, with the pepper and geranium arriving sooner. If you love the mineral-flash top of the EDT, the EDP will feel slightly softer at the start.",
      },
      { kind: "heading", text: "The drydown" },
      {
        kind: "paragraph",
        text: "This is where the EDP pulls ahead. Its base adds patchouli and a resinous benzoin warmth the EDT doesn't reach. The EDT stays mineral and cedar-vetiver dry. Neither is wrong; the EDP is just the more complete, more cold-capable expression.",
      },
      {
        kind: "callout",
        tone: "gold",
        text: "If you think of the EDT as 'summer Terre' and the EDP as 'the rest of the year Terre', the choice mostly makes itself.",
      },
      { kind: "heading", text: "Is the price jump worth it?" },
      {
        kind: "paragraph",
        text: "At roughly $20 difference per 100ml, the EDP is one of the better value concentration jumps in designer fragrance — you get more longevity and a richer drydown for under 20% more money. Compare that to houses where the EDP-to-Extrait jump doubles the price for marginal gains.",
      },
    ],
    faq: [
      {
        question: "Does the EDP just last longer than the EDT?",
        answer:
          "It lasts about two hours longer, but more importantly it smells slightly different — warmer, more patchouli, less citrus-flash. If you only want longer wear and prefer the bright EDT top, re-spraying the EDT is a fine alternative.",
      },
      {
        question: "Which is better for summer?",
        answer:
          "The EDT, in genuine heat. Its brighter citrus and lighter base read cleaner in warm weather. In temperate summers the EDP is still fine; in 30°C+ heat the EDT is the safer call.",
      },
      {
        question: "Is there an even stronger Terre d'Hermès?",
        answer:
          "There's an Eau Intense Vetiver flanker and limited Extrait concentrations at much higher prices. For most buyers the EDT/EDP pair covers the range; the Extrait is a collector's item, not a value play.",
      },
    ],
    related: ["dior-homme-intense-vs-prada-infusion-diris", "sample-vs-full-bottle"],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 5. COMPARISON — Dior Homme Intense vs Prada Infusion d'Iris (gender)
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "dior-homme-intense-vs-prada-infusion-diris",
    category: "comparison",
    label: "COMPARISON",
    title: "Dior Homme Intense vs Prada Infusion d'Iris — Does Gender Labeling Mean Anything?",
    description:
      "Two iris-forward scents with opposite gender marketing. A duel testing whether 'for men' and 'for women' on the bottle reflects anything chemical, or just shelf placement.",
    directAnswer:
      "Almost nothing, chemically. Both scents are built around iris, cedar and vetiver; the Dior adds a cocoa-leather base and the Prada adds incense, but neither ingredient is gendered. The Dior reads slightly richer and the Prada slightly drier, but blind, most people can't tell which was sold to which gender. The labels are marketing, not formula.",
    publishedDate: "2025-02-28",
    updatedDate: "2025-03-18",
    author: { name: "R. Okafor", role: "Contributing Editor" },
    tags: ["comparison", "floral", "iris", "gender", "unisex"],
    fragrancesInvolved: ["dior-homme-intense", "prada-infusion-diris"],
    sides: [
      { fragranceId: "dior-homme-intense" },
      { fragranceId: "prada-infusion-diris" },
    ],
    verdict: {
      title: "The gender labels are cosmetic — the formulas are siblings",
      text: "Both are iris-cedar-vetiver scents differing mainly in base (cocoa-leather vs incense) and intensity. Neither base note is chemically gendered. If you like iris and have been avoiding one because of the label on the bottle, you're missing a scent you'd probably enjoy. Wear either; the label is for the department store, not your skin.",
      confidence: 5,
    },
    metrics: [
      {
        label: "Longevity (skin)",
        values: ["9 hrs", "6 hrs"],
      },
      {
        label: "Sillage (1-5)",
        values: ["3", "3"],
      },
      {
        label: "Shared pyramid notes",
        values: ["Iris, Cedar, Vetiver", "Iris, Cedar, Vetiver"],
      },
      {
        label: "Distinctive base note",
        values: ["Cocoa, Leather", "Incense, Benzoin"],
      },
      {
        label: "Marketed as",
        values: ["for men", "for women"],
        note: "Neither base note is chemically gendered.",
      },
    ],
    body: [
      {
        kind: "paragraph",
        text: "The 'for men / for women' split on a fragrance bottle is one of the most confidently-repeated marketing fictions in the industry. The cleanest way to test it is to take two iris scents with opposite labels and ask what's actually different. Here, not much.",
      },
      { kind: "heading", text: "What's actually the same" },
      {
        kind: "list",
        items: [
          "Both centre on iris — the same rooty, slightly powdery iris material.",
          "Both use cedar as the woody backbone.",
          "Both dry down toward vetiver.",
          "Neither contains anything chemically tied to a biological sex.",
        ],
      },
      { kind: "heading", text: "What's actually different" },
      {
        kind: "paragraph",
        text: "The Dior adds cocoa and leather in the base, which reads as warmer and more 'rounded'. The Prada adds incense and benzoin, which reads as drier and more meditative. The Dior is also more concentrated and lasts longer. None of these differences map onto gender — they map onto 'richer' vs 'drier', which is a taste question.",
      },
      {
        kind: "callout",
        tone: "wine",
        text: "If you swapped the labels, almost no one would notice. The 'for men' scent is perfectly wearable by women and vice versa; the only real signal is concentration.",
      },
      { kind: "heading", text: "Why the labels exist" },
      {
        kind: "paragraph",
        text: "Shelf placement, gift-buyer confidence and marketing photography. A fragrance marketed 'for men' sells differently to a partner buying a gift than an unlabelled one would. The label is a sales tool, not a chemical description. Buy the iris scent you prefer; ignore the bottle copy.",
      },
    ],
    faq: [
      {
        question: "Can men wear Prada Infusion d'Iris?",
        answer:
          "Yes. It's an iris-cedar-incense scent with nothing chemically feminine about it. Men who enjoy dry, powdery, slightly meditative scents will like it; the 'for women' label reflects marketing, not formula.",
      },
      {
        question: "Is Dior Homme Intense too feminine for some men?",
        answer:
          "It's iris-forward and slightly powdery, which reads as 'lipstick' to some noses. If you dislike powdery scents, skip it — but that's a taste call, not a gender one. The cocoa-leather base keeps it reading as substantial.",
      },
      {
        question: "Why are most scents gendered at all?",
        answer:
          "Largely for retail segmentation and gift-buyer clarity. Chemically, fragrance materials don't have gender. The split is a 20th-century marketing convention that persists because it simplifies buying for other people.",
      },
    ],
    related: ["terre-dhermes-edt-vs-edp", "khamrah-vs-angels-share"],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 6. LAYERING — Acqua di Parma Colonia × Santal 33 (citrus + woody)
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "acqua-di-parma-colonia-santal-33-layering",
    category: "layering",
    label: "LAYERING DUEL",
    title: "Acqua di Parma Colonia × Santal 33 — The Citrus-on-Wood Layering Rule",
    description:
      "A textbook contrast layer: a bright, fleeting Italian citrus over a dry, long sandalwood. Whether the rule actually produces a better scent than either alone, and the exact ratio that works.",
    directAnswer:
      "This is the layering combination that justifies the whole technique. Two sprays of Santal 33 as the base, one spray of Acqua di Parma Colonia on top, gives you a citrus-bright sandalwood for the first hour that no single bottle reproduces. After that it's Santal 33 as usual. Worth doing precisely because neither scent alone gives you the first hour.",
    publishedDate: "2025-03-06",
    updatedDate: "2025-03-20",
    author: { name: "M. Aldridge", role: "Senior Editor" },
    tags: ["layering", "citrus", "woody", "sandalwood", "contrast"],
    fragrancesInvolved: ["acqua-di-parma-colonia", "le-labo-santal-33"],
    sides: [
      { fragranceId: "acqua-di-parma-colonia", label: "Top coat" },
      { fragranceId: "le-labo-santal-33", label: "Layered (1:2)" },
    ],
    verdict: {
      title: "The contrast rule works — this is the combo that proves it",
      text: "Citrus-on-wood is the most reliable layering archetype because the two do genuinely different jobs: one provides a bright, short top the other lacks, the other provides a long, dry base the first can't. The result isn't a 'new scent' so much as a Santal 33 with a first hour you can't otherwise buy. If you've been skeptical of layering, start here.",
      confidence: 5,
    },
    metrics: [
      {
        label: "Longevity (skin)",
        values: ["5 hrs", "8 hrs"],
        note: "Layered longevity = Santal 33, as expected.",
      },
      {
        label: "Sillage (1-5)",
        values: ["2", "4"],
      },
      {
        label: "Sweet spot ratio",
        values: ["1 spray Colonia", "2 sprays Santal 33"],
      },
      {
        label: "Bright opening gain",
        values: ["Reference", "Yes — first 60 min"],
        note: "The whole point: a citrus top Santal 33 doesn't have.",
      },
    ],
    body: [
      {
        kind: "paragraph",
        text: "Most layering 'rules' are folklore dressed up as chemistry. The one that consistently holds is contrast layering: a bright, volatile top over a heavy, slow base. Citrus over wood is the canonical case, and Colonia over Santal 33 is the cleanest example we've tested.",
      },
      { kind: "heading", text: "Why this pairing works" },
      {
        kind: "paragraph",
        text: "Colonia is almost entirely top notes — lemon, orange, bergamot, a little neroli — and it's gone in two hours. Santal 33 is almost entirely base — sandalwood, cedar, leather, papyrus — with a thin violet-cardamom top. Layered, Colonia supplies the opening Santal 33 lacks; Santal 33 supplies the drydown Colonia can't. Neither redundantly doubles the other.",
      },
      { kind: "heading", text: "The ratio that works" },
      {
        kind: "list",
        items: [
          "Two sprays of Santal 33 first (inner wrist + forearm).",
          "Wait thirty seconds, then one spray of Colonia on top of the same spot.",
          "Do not spray Colonia elsewhere — it needs to sit on the Santal 33 base.",
        ],
      },
      {
        kind: "callout",
        tone: "gold",
        text: "The reward is the first sixty minutes: a genuinely citrus-bright sandalwood that no single bottle on the market reproduces. After that you're wearing Santal 33, which you were going to anyway.",
      },
      { kind: "heading", text: "When it fails" },
      {
        kind: "paragraph",
        text: "Invert the ratio (more Colonia than Santal 33) and you get a thin, citrus-tinged nothing — the Colonia evaporates and the Santal 33 is too sparse to register. More than one spray of Colonia wastes it; the top is saturated after one.",
      },
    ],
    faq: [
      {
        question: "Can I use a cheaper citrus than Colonia?",
        answer:
          "Yes — any honest bergamot/neroli cologne works. 4711, Roger & Gallet Jean-Marie Farina, or even a budget Neroli Portofino dupe all do the job. Colonia is nicer but the layering gain is similar; the key is a citrus-forward scent with minimal base of its own.",
      },
      {
        question: "Why not just buy a citrus-sandalwood scent?",
        answer:
          "You can, and a few exist. The reason to layer is control: you can dial the citrus up or down, and you get to use two bottles you already own. If you don't own either, a single citrus-sandalwood is more cost-effective.",
      },
      {
        question: "Does the order of application matter?",
        answer:
          "Yes. The heavier base (Santal 33) goes on first so the lighter citrus (Colonia) has something to sit on. Reversed, the Colonia evaporates before the Santal 33 can anchor it and you lose the first hour entirely.",
      },
    ],
    related: ["bleu-de-chanel-santal-33-layering", "how-to-test-a-duel-at-home"],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 7. GUIDE — Does perfume maceration actually work?
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "does-perfume-maceration-work",
    category: "guide",
    label: "GUIDE",
    title: "Does Perfume Maceration Actually Work? Letting a Bottle 'Rest' Before Judging It",
    description:
      "The claim that a fragrance 'settles' and improves weeks after first spray, tested. What maceration actually means, what it does and doesn't do, and when waiting helps.",
    directAnswer:
      "Partly. Real maceration happens at the factory before bottling, not on your shelf, so a sealed bottle won't improve. But a bottle that's been opened and sprayed a few times does change slightly over weeks — usually the harsh alcohol top softens and the drydown reads smoother. It's a real but small effect, mostly on the opening, and it doesn't rescue a bad fragrance.",
    publishedDate: "2025-01-05",
    updatedDate: "2025-03-02",
    author: { name: "M. Aldridge", role: "Senior Editor" },
    tags: ["guide", "maceration", "storage", "methodology"],
    fragrancesInvolved: [],
    metrics: [],
    body: [
      {
        kind: "paragraph",
        text: "The 'let it macerate' advice is everywhere in fragrance communities: buy a bottle, spray it once, put it in a dark drawer for six weeks, and it'll supposedly improve. The truth is messier and splits into two separate claims that get conflated.",
      },
      { kind: "heading", text: "What maceration actually means" },
      {
        kind: "paragraph",
        text: "In production, maceration is the period after blending when a fragrance sits in a stainless steel tank so the aromatic materials fully dissolve and integrate with the alcohol. This is done at the factory, before bottling, and takes days to weeks depending on the house. By the time a bottle reaches you, this step is already complete.",
      },
      {
        kind: "callout",
        tone: "wine",
        text: "A sealed, unopened bottle on your shelf is not macerating. It's just sitting there. Real maceration happened at the factory.",
      },
      { kind: "heading", text: "What does change after opening" },
      {
        kind: "paragraph",
        text: "Once a bottle has been opened and sprayed a few times, two things happen. First, a small amount of oxygen enters the bottle and very mildly oxidises the top notes — this tends to soften harsh alcohol and sharp citrus. Second, the ethanol 'evens out' with the aromatics over repeated use. The result is usually a smoother opening and a slightly more integrated drydown over the first few weeks of regular wear.",
      },
      { kind: "heading", text: "How big is the effect?" },
      {
        kind: "list",
        items: [
          "Mostly affects the first 5–10 minutes (the alcohol/Top opening).",
          "Minimal effect on the heart and base, which are more chemically stable.",
          "Will not turn a fragrance you dislike into one you like.",
          "More noticeable on cheaper scents with harsher alcohol; barely noticeable on well-made niche.",
        ],
      },
      {
        kind: "callout",
        tone: "gold",
        text: "If a new bottle smells harsh and alcoholic on first spray, give it two to three weeks of occasional use and re-test. If you still dislike it after that, the problem is the fragrance, not the maceration.",
      },
      { kind: "heading", text: "How to store for the best result" },
      {
        kind: "list",
        items: [
          "Cool, dark place — a drawer or closed cabinet, not a sunny windowsill.",
          "Stable temperature; avoid bathrooms with big humidity swings.",
          "Upright, cap on. Oxygen is the enemy long-term.",
          "Don't decant and re-bottle repeatedly — each transfer adds oxygen.",
        ],
      },
    ],
    faq: [
      {
        question: "Should I let a brand new bottle rest before first wear?",
        answer:
          "Not really. Shipping agitation can make a bottle smell slightly off for an hour after arrival, so letting it settle upright for a day is reasonable. But weeks of 'rest' for an unopened bottle does nothing — maceration already happened at the factory.",
      },
      {
        question: "Can maceration fix a perfume that smells too alcoholic?",
        answer:
          "It can soften the alcohol edge over a few weeks of occasional use, yes. But if the alcohol dominates because the fragrance itself is thin, no amount of waiting will add depth that isn't there.",
      },
      {
        question: "Does maceration make fragrances stronger or longer-lasting?",
        answer:
          "No. Longevity and sillage are set by concentration and the materials used. Any perceived 'performance gain' after weeks is usually the user noticing the drydown more once the harsh opening softens — not an actual change in longevity.",
      },
    ],
    related: ["sample-vs-full-bottle", "how-to-test-a-duel-at-home"],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 8. GUIDE — Sample vs full bottle
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "sample-vs-full-bottle",
    category: "guide",
    label: "GUIDE",
    title: "Sample vs Full Bottle — A Real Decision Framework",
    description:
      "A working rule for when to sample and when to commit to a full bottle. Built around cost-per-wear, scent fatigue, and the one situation where sampling is a waste of money.",
    directAnswer:
      "Sample anything over $150, anything you'll wear in heat, and anything you haven't worn on your own skin for a full day. Buy full bottles of scents you've already sampled and worn at least five times, and of cheap scents where the sample costs nearly as much as the bottle. Skip sampling only for sub-$30 blind buys you can re-gift.",
    publishedDate: "2025-02-10",
    updatedDate: "2025-03-08",
    author: { name: "R. Okafor", role: "Contributing Editor" },
    tags: ["guide", "buying", "samples", "value"],
    fragrancesInvolved: [],
    metrics: [],
    body: [
      {
        kind: "paragraph",
        text: "The standard advice — 'always sample first' — is correct but incomplete. Sampling has a cost, and at the low end of the market that cost can approach the price of the bottle. Here's the decision framework we actually use.",
      },
      { kind: "heading", text: "When to sample (almost) always" },
      {
        kind: "list",
        items: [
          "Anything over $150 / 100ml. The downside of a wrong full bottle dwarfs the sample cost.",
          "Anything you intend to wear in heat above 28°C. Heat changes scents unpredictably; a winter test isn't a summer verdict.",
          "Anything you've only smelled on paper or on someone else. Skin chemistry is real and paper lies.",
          "Anything from a house whose style you don't know. House signatures matter.",
        ],
      },
      { kind: "heading", text: "When buying blind is fine" },
      {
        kind: "paragraph",
        text: "Below roughly $30, the sample often costs $8–12, which is a third to half the bottle price. At that ratio, blind-buying the bottle and re-gifting or swapping it if you dislike it is usually the better expected-value play. This is the only situation where skipping the sample is rational.",
      },
      {
        kind: "callout",
        tone: "gold",
        text: "Rule of thumb: if the sample costs more than 25% of the full bottle, blind-buy. If it costs under 10%, sample.",
      },
      { kind: "heading", text: "The 'wear it five times' rule" },
      {
        kind: "paragraph",
        text: "A single wearing isn't a verdict. Scent fatigue, mood, ambient temperature and what you ate all colour a first impression. Wear a sample at least five times across two weeks before committing to a full bottle. If you still want it after the fifth wear, the bottle is safe to buy.",
      },
      { kind: "heading", text: "Cost-per-wear, the only number that matters" },
      {
        kind: "paragraph",
        text: "A $250 bottle you wear 200 times costs $1.25 per wear. A $40 bottle you wear twice costs $20 per wear. Price per millilitre is a marketing number; price per wear is the real one. Track your wears for a month before your next purchase — it's the single highest-leverage habit in fragrance collecting.",
      },
    ],
    faq: [
      {
        question: "How many wears should I get out of a 10ml sample?",
        answer:
          "Roughly 60–80 sprays depending on the atomiser, so 10–15 full wears. That's enough for the five-wear rule with margin, which is exactly what a sample is for.",
      },
      {
        question: "Are decant sites a good middle ground between sample and bottle?",
        answer:
          "Yes, for scents over $150. A 10ml decant from a reputable splitter costs a fraction of the bottle and gives you enough for a real multi-week test. Treat it as a larger sample, not a smaller bottle.",
      },
      {
        question: "What about discovery sets?",
        answer:
          "Good value if you want to learn a house's whole style. Treat each 2ml as a paper-strip test, not a skin verdict — 2ml is roughly 12 sprays, enough for two full wears per scent. Use the set to shortlist, then buy larger samples of the two or three you liked.",
      },
    ],
    related: ["does-perfume-maceration-work", "how-to-test-a-duel-at-home"],
  },

  // ────────────────────────────────────────────────────────────────────────
  // 9. GUIDE — How to test a fragrance duel at home
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: "how-to-test-a-duel-at-home",
    category: "guide",
    label: "GUIDE",
    title: "How to Test a Fragrance Duel at Home — Paper Strip vs Skin",
    description:
      "The methodology behind every ScentDuel verdict: how to run a fair side-by-side comparison at home, where to spray, what to ignore, and the one mistake that invalidates the whole test.",
    directAnswer:
      "Test on your own skin, not paper. Spray each scent on the opposite inner forearm, one spray each, at the same time. Smell at 5, 30, 90 and 240 minutes. Don't sniff continuously — olfactory fatigue resets in 20–30 seconds of fresh air. Paper strips only tell you the opening; skin tells you the whole wear, which is the only verdict that matters.",
    publishedDate: "2025-03-01",
    updatedDate: "2025-03-22",
    author: { name: "M. Aldridge", role: "Senior Editor" },
    tags: ["guide", "methodology", "testing", "skin"],
    fragrancesInvolved: [],
    metrics: [],
    body: [
      {
        kind: "paragraph",
        text: "Every verdict on this site comes from the same home methodology. It's not lab-grade, but it's repeatable, and it's the only way to compare two scents honestly without a perfumer's organ. Here it is in full.",
      },
      { kind: "heading", text: "Why skin, not paper" },
      {
        kind: "paragraph",
        text: "Paper strips (mouillettes) show you the opening of a fragrance and almost nothing else. They don't have body heat, they don't have skin chemistry, and they don't show you how a scent projects or how long it lasts on a person. For a comparison that's supposed to reflect real wear, paper is misleading. Use it only to confirm which strip is which at the start.",
      },
      {
        kind: "callout",
        tone: "wine",
        text: "If a reviewer's verdict is based on paper strips, it's a verdict about the first ten minutes. Ignore it for any wear-length question.",
      },
      { kind: "heading", text: "The setup" },
      {
        kind: "list",
        items: [
          "Wash forearms with unscented soap, dry. No moisturiser — it changes projection.",
          "One spray of scent A on the inner left forearm, one of scent B on the inner right.",
          "Same distance from skin, same spray count, applied within ten seconds of each other.",
          "Note the time. Don't smell anything for the first five minutes — let the alcohol flash off.",
        ],
      },
      { kind: "heading", text: "The sniffing schedule" },
      {
        kind: "paragraph",
        text: "Smell each arm in turn at 5, 30, 90 and 240 minutes. Between sniffs, get 20–30 seconds of fresh air to reset olfactory fatigue — your nose goes nose-blind to a scent faster than you think, and continuous sniffing makes everything smell weaker. Write one sentence per scent per checkpoint. Don't trust memory; write it down.",
      },
      { kind: "heading", text: "The variables to control" },
      {
        kind: "list",
        items: [
          "Same ambient temperature and humidity each day (a note app helps).",
          "Same time of day — skin chemistry shifts across the day.",
          "No coffee, spicy food or strong drinks in the hour before.",
          "Same spray distance and same atomiser type if possible.",
        ],
      },
      {
        kind: "callout",
        tone: "gold",
        text: "The single mistake that invalidates a duel: wearing one scent today and the other tomorrow and comparing from memory. Skin chemistry, mood and ambient conditions vary day to day. Side-by-side, same arm-session, is the only fair test.",
      },
      { kind: "heading", text: "Adding a blind sniffer" },
      {
        kind: "paragraph",
        text: "If you can, have someone else smell both arms at each checkpoint without knowing which is which. Their call at 30 and 90 minutes is more reliable than yours, because you've been huffing both and your nose is fatigued. A partner, housemate or willing friend is enough; you don't need a panel.",
      },
    ],
    faq: [
      {
        question: "Can I test more than two scents at once?",
        answer:
          "Not reliably. Past two, fatigue compounds and you start losing the subtleties. If you need to compare three or four, run separate two-scent duels and pick winners. Tournament-style beats a free-for-all.",
      },
      {
        question: "Does it matter which arm gets which scent?",
        answer:
          "Marginally. Some people find their left and right forearms project slightly differently, but the effect is small. The bigger risk is 'leakage' — spraying too close together so the sillage clouds mix. Keep the two sprays on opposite arms, not the same arm.",
      },
      {
        question: "What if the two scents are extremely similar?",
        answer:
          "This is the one case where paper actually helps. Test the openings on paper side by side first to learn the small difference, then confirm on skin. For near-clones, the opening difference is often the whole story; the drydowns may be nearly identical.",
      },
    ],
    related: [
      "bleu-de-chanel-santal-33-layering",
      "does-perfume-maceration-work",
    ],
  },
];

/* Note: content validation (duplicate slugs, sides count, broken fragrance/
 * article references) is consolidated in lib/content.ts → validateContent(),
 * which runs once at module load. This keeps a single source of truth for
 * build-time-equivalent checks. */

export const articleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug);

export const articlesByCategory = (cat: Article["category"]): Article[] =>
  ARTICLES.filter((a) => a.category === cat);

export const featuredArticles = (): Article[] =>
  ARTICLES.filter((a) => a.featured);

"use client";

import { Eyebrow } from "./eyebrow";
import { JsonLd, breadcrumbLd } from "./json-ld";

export function AboutView({ onNavigate }: { onNavigate: (hash: string) => void }) {
  const crumbs = breadcrumbLd([
    { name: "Home", url: "https://scentduel.com/" },
    { name: "About", url: "https://scentduel.com/#/about" },
  ]);

  return (
    <div className="sd-fade-up mx-auto max-w-3xl px-4 pb-20 pt-8 sm:pt-12">
      <JsonLd data={crumbs} />
      <button
        onClick={() => onNavigate("#/")}
        className="mb-6 text-sm text-muted-foreground transition-colors hover:text-wine"
      >
        ← Home
      </button>

      <Eyebrow>About</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        ScentDuel is a fragrance site for the pairs you can't Google cleanly.
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Updated July 2026
      </p>

      <div className="prose-custom mt-6 space-y-5 text-[1.0625rem] leading-relaxed text-foreground/85">
        <p>
          Two formats dominate fragrance content online: designer dupe / clone
          databases (crowded, mostly AI-generated, mostly identical), and the
          five or six world-famous comparison battles that established blogs
          and forums have covered for over a decade. ScentDuel does neither.
        </p>
        <p>
          We write about specific, less-obvious, tested pairs — a real
          layering combination with a ratio and a wear-time verdict, a
          smells-like claim verified side by side, a concentration jump
          interrogated for value, two oppositely-gendered iris scents duelled
          to show that the label is cosmetic.
        </p>
        <p>
          Every verdict comes from the same methodology: two scents sprayed on
          opposite inner forearms at the same time, sniffed at 5, 30, 90 and
          240 minutes, with a blind second nose where possible. We publish
          that methodology so you can reproduce it at home — see the guide on{" "}
          <button
            className="text-wine underline-offset-2 hover:underline"
            onClick={() => onNavigate("#/article/how-to-test-a-duel-at-home")}
          >
            how to test a fragrance duel at home
          </button>
          .
        </p>
        <p>
          Longevity and sillage ratings are editor-tested approximations on
          average skin, not manufacturer claims. Prices are approximate USD for
          a standard 50–100ml bottle and fluctuate. Nothing here is sponsored.
        </p>
      </div>

      <div className="mt-10 rounded-lg border border-border bg-surface-elevated/50 p-6">
        <h2 className="font-display text-xl font-semibold text-foreground">
          The editorial standard
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>· Every duel opens with a 40–60 word direct answer.</li>
          <li>· A two-card VS layout with a metrics table, not a wall of prose.</li>
          <li>· A labelled verdict callout with a confidence rating.</li>
          <li>· FAQ block with structured data for each article.</li>
          <li>· Visible last-updated date and named author on every post.</li>
        </ul>
      </div>
    </div>
  );
}

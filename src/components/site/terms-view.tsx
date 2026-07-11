"use client";

import { LegalPage, LegalSection } from "./legal-page";

/**
 * Terms of use. Covers: editorial independence, no sponsored verdicts,
          disclaimer on longevity/sillage ratings (editor-tested, not
          manufacturer claims), acceptable use, liability. Route: #/terms
 */
export function TermsView({
  onNavigate,
}: {
  onNavigate: (hash: string) => void;
}) {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of use"
      lastUpdated="July 2025"
      pageSlug="terms"
      onNavigate={onNavigate}
      intro="By using ScentDuel you agree to these terms. They're written in plain English — no 30-page legalese."
    >
      <LegalSection heading="Editorial independence">
        <p>
          ScentDuel is an independent editorial fragrance site. We do not accept
          payment for verdicts, rankings, or coverage. No fragrance house has
          input on our conclusions. If a fragrance is bad, we say so; if a
          $25 scent beats a $300 one, we say that too.
        </p>
        <p>
          We do not receive samples conditional on a positive review. Fragrances
          referenced in our duels are typically purchased at retail, occasionally
          gifted by readers — gifted samples are always disclosed in the article
          byline.
        </p>
      </LegalSection>

      <LegalSection heading="Performance ratings">
        <p>
          Longevity (hours) and sillage (1-5) ratings are{" "}
          <strong className="text-foreground">editor-tested approximations on
          average skin</strong>, not manufacturer claims or laboratory
          measurements. Real-world performance varies with skin chemistry,
          ambient temperature, humidity, application method, and batch variation.
        </p>
        <p>
          Prices are approximate USD for a standard 50-100ml bottle at the time
          of writing and fluctuate. Value scores are derived from these
          approximations — treat them as a relative guide, not a precise
          calculation.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <p>
          You may read, bookmark, share, and print ScentDuel content for personal
          use. You may quote brief excerpts with attribution and a link back to
          the source article.
        </p>
        <p>
          You may not: republish full articles without permission; scrape the
          fragrance dataset for commercial use; or use the ScentDuel name,
          logo, or content to imply endorsement of a product you sell.
        </p>
      </LegalSection>

      <LegalSection heading="The comparator and finder tools">
        <p>
          The Scent Duel Comparator, Wear Tonight Finder, and Family Explorer are
          provided as editorial decision aids. Their output (note-overlap
          percentages, value scores, occasion rankings) is generated from a
          curated, simplified dataset and should not be treated as definitive.
          Always sample a fragrance on your own skin before purchasing.
        </p>
      </LegalSection>

      <LegalSection heading="External links">
        <p>
          We link to external sites (retailers, reference sites, brand pages) for
          context. We are not responsible for the content, availability, or
          practices of those sites. The presence of a link does not imply
          endorsement.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          ScentDuel is provided &ldquo;as is&rdquo; without warranty of any kind.
          We are not liable for purchasing decisions you make based on our
          content. If a fragrance you buy based on our recommendation
          disappoints you, that&apos;s the nature of a subjective medium —
          sample first.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to these terms">
        <p>
          We may update these terms as the site evolves. Material changes will
          be reflected in the &ldquo;last updated&rdquo; date above. Continued
          use after changes constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms? Email{" "}
          <span className="font-medium text-foreground">editorial@scentduel.com</span>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

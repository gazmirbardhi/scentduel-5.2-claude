import React from "react";

/**
 * Injects a JSON-LD <script> tag for structured data.
 * Static-export safe — rendered into the HTML at build time.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is author-controlled, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ScentDuel",
  url: "https://scentduel.com",
  description:
    "Head-to-head fragrance comparisons, verified smells-like claims, and tested layering combinations.",
  logo: "https://scentduel.com/logo.svg",
  sameAs: [],
};

export const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ScentDuel",
  url: "https://scentduel.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://scentduel.com/#/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

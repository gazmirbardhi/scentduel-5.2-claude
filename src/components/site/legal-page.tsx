"use client";

import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";
import { JsonLd, breadcrumbLd } from "./json-ld";
import { ArrowLeft } from "lucide-react";

/**
 * Shared layout for legal/info pages (Privacy, Terms, Cookies). Provides the
 * back button, eyebrow, headline, last-updated date, and a prose container
 * with consistent typography. Children are the page-specific content.
 */
export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  intro,
  children,
  onNavigate,
  pageSlug,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: string;
  children: ReactNode;
  onNavigate: (hash: string) => void;
  pageSlug: string;
}) {
  const crumbs = breadcrumbLd([
    { name: "Home", url: "https://scentduel.com/" },
    { name: title, url: `https://scentduel.com/#/${pageSlug}` },
  ]);

  return (
    <div className="sd-fade-up mx-auto max-w-3xl px-4 pb-20 pt-8 sm:pt-12">
      <JsonLd data={crumbs} />

      <button
        onClick={() => onNavigate("#/")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-wine"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated {lastUpdated}
      </p>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {intro}
      </p>

      <div className="mt-8 space-y-6">{children}</div>
    </div>
  );
}

/** A section heading + body block used inside LegalPage. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-foreground">
        {heading}
      </h2>
      <div className="mt-2 space-y-3 text-[1rem] leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  );
}

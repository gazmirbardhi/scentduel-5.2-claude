"use client";

import { ARTICLES } from "@/lib/articles";
import { formatDate, readingMinutes } from "@/lib/content";
import { Eyebrow } from "./eyebrow";
import { JsonLd, breadcrumbLd } from "./json-ld";
import { ArrowLeft, User, Mail, BookOpen } from "lucide-react";

const EDITORS = [
  {
    name: "M. Aldridge",
    role: "Senior Editor",
    bio: "A decade-plus fragrance collector with a bias for woody-aromatics and a healthy skepticism for marketing copy. Started ScentDuel to write the comparisons they couldn't find a clean answer to elsewhere. Tests every duel on skin, never on paper.",
    focus: ["Woody", "Aromatic", "Layering methodology", "Concentration comparisons"],
  },
  {
    name: "R. Okafor",
    role: "Contributing Editor",
    bio: "Niche-leaning collector specialising in Arabic-market fragrances and the designer-adjacent niche aisle. Runs the beast-mode beat. Believes Lattafa has done more for fragrance accessibility than any heritage house in the last decade.",
    focus: ["Oriental", "Gourmand", "Arabic houses", "Beast-mode performance"],
  },
];

/**
 * Author / editorial team page. Lists the editors with bios, focus areas,
 * and the articles each has written. Route: #/author
 */
export function AuthorView({
  onNavigate,
  onOpenArticle,
}: {
  onNavigate: (hash: string) => void;
  onOpenArticle: (slug: string) => void;
}) {
  const crumbs = breadcrumbLd([
    { name: "Home", url: "https://scentduel.com/" },
    { name: "Authors", url: "https://scentduel.com/#/author" },
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

      <Eyebrow>The editorial team</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        Authors &amp; editorial standards
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
        ScentDuel is written by collectors, not PR. Every verdict comes from
        side-by-side skin testing — never paper strips, never press releases.
      </p>

      {/* Editors */}
      <div className="mt-10 space-y-8">
        {EDITORS.map((editor) => {
          const articles = ARTICLES.filter((a) => a.author.name === editor.name);
          return (
            <section
              key={editor.name}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-wine to-gold text-wine-foreground">
                  <User className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {editor.name}
                  </h2>
                  <p className="text-sm font-medium text-gold">{editor.role}</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/80">
                    {editor.bio}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {editor.focus.map((f) => (
                      <span
                        key={f}
                        className="rounded-sm border border-border bg-surface-elevated px-2 py-0.5 text-[0.65rem] text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {articles.length > 0 && (
                <div className="mt-5 border-t border-border pt-4">
                  <h3 className="mb-2 flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                    <BookOpen className="h-3.5 w-3.5" />
                    Published duels ({articles.length})
                  </h3>
                  <ul className="space-y-1">
                    {articles.map((a) => (
                      <li key={a.slug}>
                        <button
                          onClick={() => onOpenArticle(a.slug)}
                          className="group flex w-full items-center justify-between gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-surface-elevated"
                        >
                          <span className="truncate text-foreground/80 group-hover:text-wine">
                            {a.title}
                          </span>
                          <span className="shrink-0 text-[0.65rem] text-muted-foreground">
                            {readingMinutes(a)} min · {formatDate(a.updatedDate)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Contact */}
      <div className="mt-10 rounded-lg border border-border bg-surface-elevated/50 p-6">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-gold" />
          <h2 className="font-display text-lg font-semibold text-foreground">
            Get in touch
          </h2>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Tips, corrections, or a duel you&apos;d like us to run? Email{" "}
          <span className="font-medium text-foreground">editorial@scentduel.com</span>.
          We read everything but we don&apos;t accept sponsored verdicts — ever.
        </p>
      </div>
    </div>
  );
}

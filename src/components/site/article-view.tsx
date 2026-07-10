"use client";

import { useMemo, useRef } from "react";
import {
  articleBySlug,
  articleFragrances,
  formatDate,
  readingMinutes,
  relatedBySharedFragrance,
  CATEGORY_LABEL,
  categoryHash,
} from "@/lib/content";
import type { Article } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import { DuelLayout } from "./duel-layout";
import { VerdictCallout } from "./verdict-callout";
import { MetricsTable } from "./metrics-table";
import { FaqAccordion } from "./faq-accordion";
import { ArticleBody } from "./article-body";
import { ReadingProgress } from "./reading-progress";
import { TableOfContents } from "./table-of-contents";
import { ShareButtons } from "./share-buttons";
import { BookmarkToggle } from "./bookmark-toggle";
import { JsonLd, breadcrumbLd } from "./json-ld";
import { ArrowLeft, ArrowRight, CalendarClock, Clock, User } from "lucide-react";

/**
 * The core ScentDuel duel post template:
 *   label → headline → direct-answer capsule → byline →
 *   two-card duel with VS badge → verdict callout → metrics table →
 *   body → FAQ → related duels.
 *
 * Emits Article + BreadcrumbList JSON-LD.
 */
export function ArticleView({
  article,
  onNavigate,
  onBack,
}: {
  article: Article;
  onNavigate: (hash: string) => void;
  onBack: () => void;
}) {
  const openFragrance = (id: string) => onNavigate(`#/fragrance/${id}`);
  // Derive frags + sideLabels together in one memo keyed on the article slug
  // (frags is a new array each render, so memoing on it alone is ineffective).
  const { frags, sideLabels, isDuel } = useMemo(() => {
    const f = articleFragrances(article);
    let labels: [string, string];
    if (article.sides && article.sides.length === 2) {
      const a = article.sides[0];
      const b = article.sides[1];
      labels = [
        a.label ?? f[0]?.name ?? "A",
        b.label ?? f[1]?.name ?? "B",
      ];
    } else {
      labels = [f[0]?.name ?? "A", f[1]?.name ?? "B"];
    }
    const duel = Boolean(article.sides && article.sides.length === 2 && f.length >= 2);
    return { frags: f, sideLabels: labels, isDuel: duel };
  }, [article]);
  const related = [
    ...article.related
      .map((s) => articleBySlug(s))
      .filter((a): a is Article => Boolean(a)),
    ...relatedBySharedFragrance(article),
  ]
    .filter((a, i, arr) => arr.findIndex((x) => x.slug === a.slug) === i)
    .slice(0, 3);

  // Compute stable, deduplicated heading ids for the TOC + scroll-spy.
  const { headings, headingIdMap } = useMemo(() => {
    const map = new Map<string, string>();
    const seen = new Set<string>();
    const list: { id: string; text: string }[] = [];
    for (const b of article.body) {
      if (b.kind !== "heading") continue;
      let id = slugify(b.text);
      // Disambiguate duplicates with a numeric suffix.
      let n = 2;
      while (seen.has(id)) {
        id = `${slugify(b.text)}-${n}`;
        n++;
      }
      seen.add(id);
      map.set(b.text, id);
      list.push({ id, text: b.text });
    }
    return { headings: list, headingIdMap: map };
  }, [article.body]);

  const articleRef = useRef<HTMLElement>(null);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "ScentDuel",
      logo: { "@type": "ImageObject", url: "https://scentduel.com/logo.svg" },
    },
    mainEntityOfPage: `https://scentduel.com/#/article/${article.slug}`,
    keywords: article.tags.join(", "),
  };

  const crumbs = breadcrumbLd([
    { name: "Home", url: "https://scentduel.com/" },
    {
      name: CATEGORY_LABEL[article.category],
      url: `https://scentduel.com/${categoryHash(article.category)}`,
    },
    { name: article.title, url: `https://scentduel.com/#/article/${article.slug}` },
  ]);

  return (
    <>
      <ReadingProgress targetRef={articleRef} />
      <article
        ref={articleRef}
        className="sd-fade-up mx-auto max-w-5xl px-4 pb-20 pt-8 sm:pt-12"
      >
        <JsonLd data={[articleLd, crumbs]} />

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-10">
          {/* Main column */}
          <div className="max-w-3xl">
            {/* Breadcrumb / back */}
            <button
              onClick={onBack}
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-wine"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>

            {/* Label + headline */}
            <Eyebrow>{article.label}</Eyebrow>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.1] text-foreground sm:text-[2.6rem]">
              {article.title}
            </h1>

            {/* Byline + reading time + share */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-y border-border py-3 text-sm text-muted-foreground">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-gold" />
                  <span className="font-medium text-foreground/80">{article.author.name}</span>
                  <span className="text-muted-foreground">· {article.author.role}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="h-3.5 w-3.5 text-gold" />
                  Updated {formatDate(article.updatedDate)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gold" />
                  {readingMinutes(article)} min read
                </span>
              </div>
              <div className="flex items-center gap-3" data-print-hidden>
                <BookmarkToggle article={article} />
                <ShareButtons title={article.title} />
              </div>
            </div>

            {/* Direct-answer capsule */}
            <div className="mt-6 rounded-lg border border-border bg-surface-elevated/60 p-5">
              <div className="mb-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold">
                The short answer
              </div>
              <p className="text-[1.0625rem] leading-relaxed text-foreground">
                {article.directAnswer}
              </p>
            </div>

            {/* Duel two-card layout */}
            {isDuel && article.sides && frags[0] && frags[1] && (
              <section className="mt-10">
                <DuelLayout
                  sides={article.sides}
                  fragranceA={frags[0]}
                  fragranceB={frags[1]}
                  onOpenFragrance={openFragrance}
                />
              </section>
            )}

            {/* Verdict callout */}
            {article.verdict && (
              <section className="mt-8">
                <VerdictCallout
                  title={article.verdict.title}
                  text={article.verdict.text}
                  confidence={article.verdict.confidence}
                />
              </section>
            )}

            {/* Metrics table */}
            {article.metrics.length > 0 && (
              <section className="mt-8">
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">
                  {article.category === "layering" ? "Alone vs Layered" : "Side by side"}
                </h2>
                <MetricsTable rows={article.metrics} sideLabels={sideLabels} />
              </section>
            )}

            {/* Body */}
            <section className="mt-10">
              <ArticleBody blocks={article.body} headingIdMap={headingIdMap} />
            </section>

            {/* FAQ */}
            {article.faq.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
                  Frequently asked
                </h2>
                <FaqAccordion items={article.faq} />
              </section>
            )}

            {/* Related duels */}
            {related.length > 0 && (
              <section className="mt-12 border-t border-border pt-8">
                <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                  Related duels
                </h2>
                <ul className="space-y-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <button
                        onClick={() => onNavigate(`#/article/${r.slug}`)}
                        className="group flex w-full items-center justify-between gap-3 rounded-md border border-border bg-surface px-4 py-3 text-left transition-colors hover:border-gold/50 hover:bg-surface-elevated"
                      >
                        <span>
                          <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
                            {r.label}
                          </span>
                          <span className="font-display text-base font-semibold text-foreground">
                            {r.title}
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-wine" />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* TOC sidebar (desktop only) */}
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} contentRef={articleRef} />
          </aside>
        </div>
      </article>
    </>
  );
}

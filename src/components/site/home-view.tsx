"use client";

import { ARTICLES, featuredArticles, articlesByCategory } from "@/lib/articles";
import { FRAGRANCES, fragranceById, noteOverlap } from "@/lib/fragrance-data";
import type { Article, Category } from "@/lib/types";
import { ArticleCard } from "./article-card";
import { Eyebrow } from "./eyebrow";
import { JsonLd, ORGANIZATION_LD, WEBSITE_LD } from "./json-ld";
import { ArrowRight, Swords, Layers, BookOpen, FlaskConical, Search } from "lucide-react";

const CATEGORY_META: Record<
  Category,
  { label: string; plural: string; hash: string; blurb: string; icon: typeof Swords }
> = {
  comparison: {
    label: "Comparisons",
    plural: "Comparisons",
    hash: "#/category/comparisons",
    blurb:
      "Two fragrances, one verdict. Head-to-head duels on performance, smell and value — including verified smells-like claims.",
    icon: Swords,
  },
  layering: {
    label: "Layering",
    plural: "Layering Duels",
    hash: "#/category/layering",
    blurb:
      "Does spraying X over Y actually work? Tested layering combinations with ratios, wear-time and a plain yes/no verdict.",
    icon: Layers,
  },
  guide: {
    label: "Guides",
    plural: "Guides",
    hash: "#/category/guides",
    blurb:
      "Methodology and buying decisions — how to test a duel, whether maceration matters, when to sample vs buy blind.",
    icon: BookOpen,
  },
};

export function HomeView({
  onNavigate,
  onOpenArticle,
}: {
  onNavigate: (hash: string) => void;
  onOpenArticle: (slug: string) => void;
}) {
  const featured = featuredArticles();
  const lead = featured[0] ?? ARTICLES[0];
  const secondaryFeatured = featured.slice(1, 3);
  const rest = ARTICLES.filter(
    (a) => a.slug !== lead.slug && !secondaryFeatured.includes(a)
  ).slice(0, 6);

  return (
    <div className="sd-fade-up">
      <JsonLd data={[ORGANIZATION_LD, WEBSITE_LD]} />

      {/* Hero */}
      <section className="paper-grain border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Eyebrow>The niche fragrance duel site</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
                Fragrance duels for the pairs you{" "}
                <span className="text-wine">can&apos;t</span> find a clean answer to.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Not another dupe database. Not the five comparison battles
                everyone&apos;s covered for a decade. ScentDuel tests specific,
                less-obvious pairs — real layering verdicts, verified
                smells-like claims, and head-to-heads a beginner actually
                needs.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate("#/comparator")}
                  className="inline-flex items-center gap-2 rounded-md bg-wine px-5 py-2.5 text-sm font-semibold text-wine-foreground transition-all hover:bg-wine/90 hover:shadow-[0_8px_20px_-8px_rgba(122,35,49,0.5)]"
                >
                  <FlaskConical className="h-4 w-4" />
                  Try the Comparator
                </button>
                <button
                  onClick={() => onNavigate("#/category/comparisons")}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-gold/60"
                >
                  Browse duels
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
                <Stat n={`${ARTICLES.length}`} label="Tested duels" />
                <Stat n={`${FRAGRANCES.length}`} label="Fragrances profiled" />
                <Stat n="0" label="Sponsored verdicts" />
              </dl>
            </div>

            {/* Lead featured card */}
            <div className="lg:pl-6">
              <LeadCard article={lead} onOpen={onOpenArticle} />
            </div>
          </div>
        </div>
      </section>

      {/* Category nav strip */}
      <section className="border-b border-border bg-surface-elevated/40">
        <div className="mx-auto grid max-w-6xl gap-px px-4 sm:grid-cols-3">
          {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            const count = articlesByCategory(cat).length;
            return (
              <button
                key={cat}
                onClick={() => onNavigate(meta.hash)}
                className="group flex items-start gap-4 py-6 text-left transition-colors sm:py-7"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-gold transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-gold-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-lg font-semibold text-foreground">
                      {meta.label}
                    </span>
                    <span className="text-xs text-muted-foreground">({count})</span>
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {meta.blurb}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured duels */}
      {secondaryFeatured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <Eyebrow>Featured duels</Eyebrow>
              <h2 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
                Recently tested
              </h2>
            </div>
            <button
              onClick={() => onNavigate("#/category/comparisons")}
              className="hidden items-center gap-1 text-sm font-medium text-wine hover:underline sm:inline-flex"
            >
              All duels <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {secondaryFeatured.map((a) => (
              <ArticleCard key={a.slug} article={a} onOpen={onOpenArticle} />
            ))}
          </div>
        </section>
      )}

      {/* The "what makes us different" section */}
      <section className="border-y border-border bg-surface-elevated/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-2xl">
            <Eyebrow>Why ScentDuel exists</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Two formats dominate fragrance content. We deliberately don&apos;t do either.
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <DiffCard
              n="01"
              title="Not a dupe database"
              body="Designer dupe / clone finders are everywhere, mostly AI-generated and mostly the same. We don't maintain one. We verify specific smells-like claims, one at a time, with a real verdict."
            />
            <DiffCard
              n="02"
              title="Not the famous battles"
              body="Bleu de Chanel vs Sauvage has been covered for a decade. We skip the saturated headliners and target the pairs a beginner or intermediate collector can't find a clean answer to."
            />
            <DiffCard
              n="03"
              title="Tested, not listed"
              body="Every duel is worn side by side on skin, not copied from a spec sheet. Longevity and sillage are editor-tested, with the methodology published."
            />
          </div>
        </div>
      </section>

      {/* More duels grid */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            More from the archive
          </h2>
          <button
            onClick={() => onNavigate("#/category/guides")}
            className="hidden items-center gap-1 text-sm font-medium text-wine hover:underline sm:inline-flex"
          >
            All articles <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <ArticleCard key={a.slug} article={a} onOpen={onOpenArticle} />
          ))}
        </div>
      </section>

      {/* Comparator CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface to-surface-elevated p-8 sm:p-10">
          <div className="grid items-center gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Eyebrow>Flagship tool</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl">
                Run your own duel with the Scent Duel Comparator
              </h2>
              <p className="mt-3 max-w-lg text-muted-foreground">
                Pick any two fragrances and see them in our VS layout, with a
                generated note-overlap analysis showing exactly where they agree
                and where they diverge. Plus a layering combo finder.
              </p>
              <button
                onClick={() => onNavigate("#/comparator")}
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-wine px-5 py-2.5 text-sm font-semibold text-wine-foreground transition-all hover:bg-wine/90 hover:shadow-[0_8px_20px_-8px_rgba(122,35,49,0.5)]"
              >
                <Search className="h-4 w-4" />
                Open the Comparator
              </button>
            </div>
            <div className="flex justify-center lg:justify-end">
              <ComparatorPreview onNavigate={onNavigate} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{n}</dt>
      <dd className="mt-0.5 text-xs text-muted-foreground">{label}</dd>
    </div>
  );
}

function DiffCard({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="relative rounded-lg border border-border bg-surface p-6">
      <span className="font-display text-sm font-semibold text-gold">{n}</span>
      <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function LeadCard({
  article,
  onOpen,
}: {
  article: Article;
  onOpen: (slug: string) => void;
}) {
  return (
    <button
      onClick={() => onOpen(article.slug)}
      className="group block w-full rounded-xl border border-border bg-surface p-7 text-left shadow-[0_20px_50px_-30px_rgba(122,35,49,0.4)] transition-all hover:-translate-y-1 hover:border-gold/50"
    >
      <div className="flex items-center justify-between">
        <Eyebrow>{article.label}</Eyebrow>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-wine">
          Lead duel <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
        {article.title}
      </h3>
      <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted-foreground">
        {article.directAnswer}
      </p>
      <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
        <span className="h-8 w-8 rounded-full bg-gradient-to-br from-wine to-gold" aria-hidden />
        <span className="text-sm">
          <span className="font-medium text-foreground">{article.author.name}</span>
          <span className="text-muted-foreground"> · {article.author.role}</span>
        </span>
      </div>
    </button>
  );
}

function ComparatorPreview({ onNavigate }: { onNavigate: (h: string) => void }) {
  // Compute the real overlap of the default duel so the preview is accurate.
  const a = fragranceById("bleu-de-chanel-edp");
  const b = fragranceById("le-labo-santal-33");
  const overlap = a && b ? noteOverlap(a, b) : null;
  const similarity = overlap?.similarity ?? 0;

  return (
    <button
      onClick={() => onNavigate("#/comparator")}
      className="relative w-full max-w-xs rounded-lg border border-border bg-surface p-5 text-left"
      aria-label="Open comparator"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="rounded-md border border-border bg-surface-elevated p-3 text-center">
          <div className="text-[0.6rem] uppercase tracking-wider text-gold">Side A</div>
          <div className="mt-1 font-display text-sm font-semibold text-foreground">Bleu de Chanel</div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-wine text-[0.6rem] font-semibold text-wine-foreground">
          VS
        </div>
        <div className="rounded-md border border-border bg-surface-elevated p-3 text-center">
          <div className="text-[0.6rem] uppercase tracking-wider text-gold">Side B</div>
          <div className="mt-1 font-display text-sm font-semibold text-foreground">Santal 33</div>
        </div>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-elevated">
        <div
          className="h-full rounded-full bg-gradient-to-r from-wine to-gold transition-all duration-700"
          style={{ width: `${similarity}%` }}
        />
      </div>
      <div className="mt-1.5 text-center text-[0.65rem] text-muted-foreground">
        {similarity}% note overlap
      </div>
    </button>
  );
}

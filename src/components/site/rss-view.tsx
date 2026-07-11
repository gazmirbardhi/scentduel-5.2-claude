"use client";

import { Eyebrow } from "./eyebrow";
import { JsonLd, breadcrumbLd } from "./json-ld";
import { ArrowLeft, Rss, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * RSS feed info page — explains the feed, shows the URL, and offers a copy
 * button. Links to the actual /rss.xml file. Route: #/rss
 */
export function RssView({
  onNavigate,
}: {
  onNavigate: (hash: string) => void;
}) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const feedUrl = "https://scentduel.com/rss.xml";

  const crumbs = breadcrumbLd([
    { name: "Home", url: "https://scentduel.com/" },
    { name: "RSS feed", url: "https://scentduel.com/#/rss" },
  ]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(feedUrl);
      setCopied(true);
      toast({ title: "Feed URL copied", description: "Paste it into your RSS reader." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Copy failed", description: "Copy the URL from the address bar." });
    }
  };

  return (
    <div className="sd-fade-up mx-auto max-w-2xl px-4 pb-20 pt-8 sm:pt-12">
      <JsonLd data={crumbs} />

      <button
        onClick={() => onNavigate("#/")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-wine"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      <Eyebrow>Syndication</Eyebrow>
      <div className="mt-2 flex items-center gap-2">
        <Rss className="h-7 w-7 text-gold" />
        <h1 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          RSS feed
        </h1>
      </div>
      <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
        Subscribe to ScentDuel in your RSS reader to get every new duel as
        it&apos;s published — no email, no algorithm, no noise.
      </p>

      {/* Feed URL */}
      <div className="mt-8">
        <label className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
          Feed URL
        </label>
        <div className="flex items-center gap-2 rounded-md border border-border bg-surface p-2">
          <code className="flex-1 truncate px-2 text-sm text-foreground">
            {feedUrl}
          </code>
          <button
            onClick={copyUrl}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:border-gold/60 hover:text-wine"
            aria-label="Copy feed URL"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-gold" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </button>
        </div>
        <a
          href="/rss.xml"
          className="mt-2 inline-block text-sm font-medium text-wine underline-offset-2 hover:underline"
        >
          Open the raw feed →
        </a>
      </div>

      {/* How to use */}
      <div className="mt-10 space-y-4">
        <h2 className="font-display text-xl font-semibold text-foreground">
          How to use an RSS feed
        </h2>
        <ol className="space-y-3 text-[1rem] leading-relaxed text-foreground/80">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-wine text-xs font-semibold text-wine-foreground">1</span>
            <span>Install an RSS reader (we recommend <a href="https://feedly.com" className="font-medium text-wine underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">Feedly</a> or <a href="https://www.inoreader.com" className="font-medium text-wine underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">Inoreader</a> — both free).</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-wine text-xs font-semibold text-wine-foreground">2</span>
            <span>Add a new subscription and paste the feed URL above.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-wine text-xs font-semibold text-wine-foreground">3</span>
            <span>New duels will appear in your reader automatically — no visits to the site required.</span>
          </li>
        </ol>
      </div>

      {/* What you'll get */}
      <div className="mt-8 rounded-lg border border-border bg-surface-elevated/50 p-5">
        <h2 className="font-display text-base font-semibold text-foreground">
          What you&apos;ll get
        </h2>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li>· The article title, direct-answer capsule, and a link to the full duel.</li>
          <li>· The verdict headline and confidence rating.</li>
          <li>· The publication + last-updated dates.</li>
          <li>· No tracking, no email, unsubscribe by deleting the feed.</li>
        </ul>
      </div>
    </div>
  );
}

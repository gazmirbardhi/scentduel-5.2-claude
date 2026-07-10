"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Twitter, Facebook, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Social share buttons for an article. Uses the current page URL (works with
 * the SPA hash route). All share targets open in a new tab; copy-link uses
 * the clipboard with a toast fallback.
 */
export function ShareButtons({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const shareUrl = () => {
    if (typeof window === "undefined") return "";
    return encodeURIComponent(window.location.href);
  };
  const shareText = () => encodeURIComponent(`"${title}" on ScentDuel`);

  const openShare = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Share this duel anywhere.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Copy the URL from your address bar.",
      });
    }
  };

  const baseBtn =
    "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground/70 transition-colors hover:border-gold/60 hover:text-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Share
      </span>
      <button
        type="button"
        onClick={() =>
          openShare(
            `https://twitter.com/intent/tweet?text=${shareText()}&url=${shareUrl()}`
          )
        }
        aria-label="Share on X (Twitter)"
        className={baseBtn}
      >
        <Twitter className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() =>
          openShare(
            `https://www.facebook.com/sharer/sharer.php?u=${shareUrl()}`
          )
        }
        aria-label="Share on Facebook"
        className={baseBtn}
      >
        <Facebook className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className={baseBtn}
      >
        {copied ? (
          <Check className="h-4 w-4 text-gold" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

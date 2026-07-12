"use client";

import { useState, useEffect } from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Search, Menu, X, FlaskConical, Swords, Layers, BookOpen, Gamepad2, Sparkles, Dices, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Comparisons", hash: "#/category/comparisons", icon: Swords },
  { label: "Layering", hash: "#/category/layering", icon: Layers },
  { label: "Guides", hash: "#/category/guides", icon: BookOpen },
  { label: "Comparator", hash: "#/comparator", icon: FlaskConical, accent: true },
];

const TOOLS = [
  { label: "Scent Match", hash: "#/scent-match", icon: Sparkles, desc: "Find your perfect fragrance" },
  { label: "Scent Dice", hash: "#/scent-dice", icon: Dices, desc: "Roll a random scent" },
  { label: "Occasion Finder", hash: "#/find", icon: Gamepad2, desc: "What to wear tonight" },
];

/**
 * Site header: logo left, nav center-right, search icon right.
 * Mobile nav slides in from the right with a backdrop overlay.
 */
export function Header({
  onNavigate,
  onSearch,
  activeHash,
}: {
  onNavigate: (hash: string) => void;
  onSearch: () => void;
  activeHash: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const go = (hash: string) => {
    setMobileOpen(false);
    onNavigate(hash);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md surface-raised">
      {/* Subtle highlight line at top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo onClick={() => go("#/")} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = activeHash.startsWith(item.hash);
            return (
              <button
                key={item.hash}
                onClick={() => go(item.hash)}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-wine"
                    : "text-foreground/75 hover:text-foreground",
                  item.accent && !active && "text-gold hover:text-gold"
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-wine" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={onSearch}
            aria-label="Search (Ctrl K)"
            aria-keyshortcuts="Control+k Meta+k"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-surface-elevated hover:text-wine"
          >
            <Search className="h-4.5 w-4.5" />
          </button>
          <ThemeToggle />
          {/* Tools shortcut — visible on mobile only, opens the Comparator */}
          <button
            onClick={() => go("#/comparator")}
            aria-label="Open Comparator"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-surface-elevated hover:text-wine md:hidden"
          >
            <FlaskConical className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-surface-elevated md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel — slide-in overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-background border-l border-border shadow-2xl animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="font-display text-lg font-semibold text-foreground">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 hover:bg-surface-elevated"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation section */}
            <div className="px-4 pt-4">
              <span className="block px-3 text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground/60">
                Browse
              </span>
              <div className="mt-2 space-y-1">
                {NAV.map((item) => {
                  const active = activeHash.startsWith(item.hash);
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.hash}
                      onClick={() => go(item.hash)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-all",
                        active
                          ? "bg-wine/8 text-wine"
                          : "text-foreground/80 hover:bg-surface-elevated hover:text-foreground"
                      )}
                    >
                      <span className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-md",
                        active ? "bg-wine/10 text-wine" : "bg-surface text-muted-foreground"
                      )}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1">{item.label}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tools & Games section */}
            <div className="px-4 pt-6">
              <span className="block px-3 text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground/60">
                Tools & Games
              </span>
              <div className="mt-2 space-y-1">
                {TOOLS.map((item) => {
                  const active = activeHash.startsWith(item.hash);
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.hash}
                      onClick={() => go(item.hash)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-all",
                        active
                          ? "bg-gold/8 text-gold"
                          : "text-foreground/80 hover:bg-surface-elevated hover:text-foreground"
                      )}
                    >
                      <span className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-md",
                        active ? "bg-gold/10 text-gold" : "bg-surface text-muted-foreground"
                      )}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1">
                        <span className="block">{item.label}</span>
                        <span className="block text-xs font-normal text-muted-foreground">{item.desc}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer links */}
            <div className="mt-8 border-t border-border px-4 py-4">
              <div className="flex flex-wrap gap-x-4 gap-y-2 px-3">
                {[
                  { label: "About", hash: "#/about" },
                  { label: "Glossary", hash: "#/glossary" },
                  { label: "Families", hash: "#/families" },
                ].map((l) => (
                  <button
                    key={l.hash}
                    onClick={() => go(l.hash)}
                    className="text-xs text-muted-foreground transition-colors hover:text-wine"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-in animation keyframes injected once */}
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-slide-in-right {
            animation: none;
          }
        }
      `}</style>
    </header>
  );
}
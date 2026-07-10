"use client";

import { useState } from "react";
import { Logo } from "./logo";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Comparisons", hash: "#/category/comparisons" },
  { label: "Layering", hash: "#/category/layering" },
  { label: "Guides", hash: "#/category/guides" },
  { label: "Comparator", hash: "#/comparator", accent: true },
];

/**
 * Site header: logo left, nav center-right, search icon right.
 * Mobile nav collapses to a slide-down panel.
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

  const go = (hash: string) => {
    setMobileOpen(false);
    onNavigate(hash);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
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
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-surface-elevated hover:text-wine"
          >
            <Search className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-surface-elevated md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
          {NAV.map((item) => {
            const active = activeHash.startsWith(item.hash);
            return (
              <button
                key={item.hash}
                onClick={() => go(item.hash)}
                className={cn(
                  "block w-full rounded-md px-3 py-2.5 text-left text-sm font-medium",
                  active
                    ? "bg-surface-elevated text-wine"
                    : "text-foreground/80 hover:bg-surface-elevated"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}

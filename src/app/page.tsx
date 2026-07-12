"use client";

import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { HomeView } from "@/components/site/home-view";
import { CategoryView } from "@/components/site/category-view";
import { ArticleView } from "@/components/site/article-view";
import { Comparator } from "@/components/site/comparator";
import { AboutView } from "@/components/site/about-view";
import { FragranceProfileView } from "@/components/site/fragrance-profile-view";
import { OccasionFinderView } from "@/components/site/occasion-finder-view";
import { FamilyExplorerView } from "@/components/site/family-explorer-view";
import { GlossaryView } from "@/components/site/glossary-view";
import { AuthorView } from "@/components/site/author-view";
import { PrivacyView } from "@/components/site/privacy-view";
import { TermsView } from "@/components/site/terms-view";
import { CookiesView } from "@/components/site/cookies-view";
import { SitemapView } from "@/components/site/sitemap-view";
import { RssView } from "@/components/site/rss-view";
import { ScentMatch } from "@/components/site/games/scent-match";
import { ScentDice } from "@/components/site/games/scent-dice";
import { ToolsHub } from "@/components/site/tools-hub";
import { SearchDialog } from "@/components/site/search-dialog";
import { KeyboardShortcuts } from "@/components/site/keyboard-shortcuts";
import { ScrollToTop } from "@/components/site/scroll-to-top";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { articleBySlug } from "@/lib/content";
import type { Category } from "@/lib/types";

type Route =
  | { view: "home" }
  | { view: "comparator"; sideA: string | null; sideB: string | null }
  | { view: "category"; category: Category }
  | { view: "article"; slug: string }
  | { view: "fragrance"; fragranceId: string }
  | { view: "find" }
  | { view: "families" }
  | { view: "glossary" }
  | { view: "about" }
  | { view: "author" }
  | { view: "privacy" }
  | { view: "terms" }
  | { view: "cookies" }
  | { view: "sitemap" }
  | { view: "rss" }
  | { view: "scent-match" }
  | { view: "scent-dice" }
  | { view: "tools" }
  | { view: "notfound" };

function parseHash(raw: string): Route {
  // raw includes the leading "#"
  const hash = raw.replace(/^#/, "");
  if (!hash || hash === "/") return { view: "home" };

  // Split path and query (e.g. /comparator?a=id&b=id)
  const [path, query] = hash.split("?");
  const segments = path.split("/").filter(Boolean); // ["comparator"] etc.

  if (segments.length === 0) return { view: "home" };

  const [first, second] = segments;

  if (first === "comparator") {
    const params = new URLSearchParams(query ?? "");
    // Support both the legacy ?f=<id> (preselects side A) and the canonical
    // ?a=<id>&b=<id> (full duel). ?a takes precedence over ?f.
    const a = params.get("a") ?? params.get("f");
    const b = params.get("b");
    return { view: "comparator", sideA: a, sideB: b };
  }
  if (first === "category" && second) {
    if (second === "comparisons") return { view: "category", category: "comparison" };
    if (second === "layering") return { view: "category", category: "layering" };
    if (second === "guides") return { view: "category", category: "guide" };
    return { view: "notfound" };
  }
  if (first === "article" && second) {
    return { view: "article", slug: second };
  }
  if (first === "fragrance" && second) {
    return { view: "fragrance", fragranceId: second };
  }
  if (first === "find") return { view: "find" };
  if (first === "families") return { view: "families" };
  if (first === "glossary") return { view: "glossary" };
  if (first === "about") return { view: "about" };
  if (first === "author") return { view: "author" };
  if (first === "privacy") return { view: "privacy" };
  if (first === "terms") return { view: "terms" };
  if (first === "cookies") return { view: "cookies" };
  if (first === "sitemap") return { view: "sitemap" };
  if (first === "rss") return { view: "rss" };
  if (first === "scent-match") return { view: "scent-match" };
  if (first === "scent-dice") return { view: "scent-dice" };
  if (first === "tools") return { view: "tools" };
  return { view: "notfound" };
}

export default function Home() {
  const [route, setRoute] = useState<Route>({ view: "home" });
  const [searchOpen, setSearchOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const { track } = useRecentlyViewed();

  // Sync state with the URL hash.
  useEffect(() => {
    const sync = () => {
      const next = parseHash(window.location.hash);
      setRoute(next);
      // Scroll to top on every route change for a clean SPA feel.
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      // Record article visits for the "recently viewed" home section.
      if (next.view === "article") {
        const article = articleBySlug(next.slug);
        if (article) {
          track({
            slug: article.slug,
            title: article.title,
            label: article.label,
            category: article.category,
          });
        }
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [track]);

  // Keyboard shortcuts:
  //  - Cmd/Ctrl+K → toggle search
  //  - ?          → toggle this shortcuts panel
  //  - G + key    → sequence navigation (G then H/C/L/G/D)
  // Sequence keys expire after 1.2s. Ignored while a dialog is open or focus
  // is in a text input/textarea/contenteditable.
  useEffect(() => {
    let gPressed = false;
    let gTimer: ReturnType<typeof setTimeout> | null = null;

    const inTextField = () => {
      const el = document.activeElement;
      if (!el) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (el as HTMLElement).isContentEditable
      );
    };

    const onKey = (e: KeyboardEvent) => {
      // Cmd/Ctrl+K always works.
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
        return;
      }
      // Don't trigger letter shortcuts while typing or a dialog is open.
      if (inTextField() || searchOpen || shortcutsOpen) return;

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setShortcutsOpen((v) => !v);
        return;
      }

      const k = e.key.toLowerCase();
      if (k === "g") {
        gPressed = true;
        if (gTimer) clearTimeout(gTimer);
        gTimer = setTimeout(() => {
          gPressed = false;
        }, 1200);
        return;
      }
      if (gPressed) {
        const target: Record<string, string> = {
          h: "#/",
          c: "#/category/comparisons",
          l: "#/category/layering",
          g: "#/category/guides",
          d: "#/comparator",
        };
        const dest = target[k];
        if (dest) {
          e.preventDefault();
          gPressed = false;
          if (gTimer) clearTimeout(gTimer);
          // Use location.hash so hashchange sync handles state + tracking.
          if (window.location.hash === dest) {
            setRoute(parseHash(dest));
            window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
          } else {
            window.location.hash = dest;
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (gTimer) clearTimeout(gTimer);
    };
  }, [searchOpen, shortcutsOpen]);

  const navigate = useCallback((hash: string) => {
    // Setting the hash fires hashchange, which syncs state.
    if (window.location.hash === hash) {
      // Force re-render + scroll even if hash unchanged.
      setRoute(parseHash(hash));
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    } else {
      window.location.hash = hash;
    }
  }, []);

  const openArticle = useCallback(
    (slug: string) => navigate(`#/article/${slug}`),
    [navigate]
  );

  const activeHash = (() => {
    if (route.view === "home") return "#/";
    if (route.view === "comparator") {
      // Preserve query params so the active tab detection works with ?a=&b=
      const params = new URLSearchParams();
      if (route.sideA) params.set("a", route.sideA);
      if (route.sideB) params.set("b", route.sideB);
      const qs = params.toString();
      return qs ? `#/comparator?${qs}` : "#/comparator";
    }
    if (route.view === "category") return `#/category/${route.category === "comparison" ? "comparisons" : route.category === "layering" ? "layering" : "guides"}`;
    if (route.view === "article") return `#/article/${route.slug}`;
    if (route.view === "fragrance") return "#/comparator";
    if (route.view === "find") return "#/find";
    if (route.view === "families") return "#/families";
    if (route.view === "glossary") return "#/glossary";
    if (route.view === "about") return "#/about";
    return "#/";
  })();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        onNavigate={navigate}
        onSearch={() => setSearchOpen(true)}
        activeHash={activeHash}
      />

      <main className="flex-1">
        {route.view === "home" && (
          <HomeView onNavigate={navigate} onOpenArticle={openArticle} />
        )}

        {route.view === "comparator" && (
          <Comparator
            key={`${route.sideA ?? "_"}::${route.sideB ?? "_"}`}
            initialA={route.sideA}
            initialB={route.sideB}
            onNavigate={navigate}
          />
        )}

        {route.view === "category" && (
          <CategoryView
            category={route.category}
            onNavigate={navigate}
            onOpenArticle={openArticle}
          />
        )}

        {route.view === "article" &&
          (() => {
            const article = articleBySlug(route.slug);
            if (!article) return <NotFound onNavigate={navigate} />;
            return (
              <ArticleView
                article={article}
                onNavigate={navigate}
                onBack={() => navigate("#/")}
              />
            );
          })()}

        {route.view === "about" && <AboutView onNavigate={navigate} />}

        {route.view === "author" && (
          <AuthorView onNavigate={navigate} onOpenArticle={openArticle} />
        )}

        {route.view === "privacy" && <PrivacyView onNavigate={navigate} />}

        {route.view === "terms" && <TermsView onNavigate={navigate} />}

        {route.view === "cookies" && <CookiesView onNavigate={navigate} />}

        {route.view === "sitemap" && (
          <SitemapView onNavigate={navigate} onOpenArticle={openArticle} />
        )}

        {route.view === "rss" && <RssView onNavigate={navigate} />}

        {route.view === "fragrance" && (
          <FragranceProfileView
            fragranceId={route.fragranceId}
            onNavigate={navigate}
            onOpenArticle={openArticle}
          />
        )}

        {route.view === "find" && <OccasionFinderView onNavigate={navigate} />}

        {route.view === "families" && <FamilyExplorerView onNavigate={navigate} />}

        {route.view === "glossary" && <GlossaryView onNavigate={navigate} />}

        {route.view === "scent-match" && <ScentMatch onNavigate={navigate} />}

        {route.view === "scent-dice" && <ScentDice onNavigate={navigate} />}

        {route.view === "tools" && <ToolsHub onNavigate={navigate} />}

        {route.view === "notfound" && <NotFound onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} />

      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onNavigate={navigate}
      />

      <KeyboardShortcuts
        open={shortcutsOpen}
        onOpenChange={setShortcutsOpen}
        onNavigate={navigate}
      />

      <ScrollToTop />
    </div>
  );
}

function NotFound({ onNavigate }: { onNavigate: (h: string) => void }) {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="font-display text-6xl font-semibold text-wine">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">
        That duel never happened.
      </h1>
      <p className="mt-2 text-muted-foreground">
        The page you&apos;re looking for isn&apos;t here.
      </p>
      <button
        onClick={() => onNavigate("#/")}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-wine px-5 py-2.5 text-sm font-semibold text-wine-foreground hover:bg-wine/90"
      >
        Back to home
      </button>
    </div>
  );
}

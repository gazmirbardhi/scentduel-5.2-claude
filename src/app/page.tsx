"use client";

import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { HomeView } from "@/components/site/home-view";
import { CategoryView } from "@/components/site/category-view";
import { ArticleView } from "@/components/site/article-view";
import { Comparator } from "@/components/site/comparator";
import { AboutView } from "@/components/site/about-view";
import { SearchDialog } from "@/components/site/search-dialog";
import { articleBySlug } from "@/lib/content";
import type { Category } from "@/lib/types";

type Route =
  | { view: "home" }
  | { view: "comparator"; preselect: string | null }
  | { view: "category"; category: Category }
  | { view: "article"; slug: string }
  | { view: "about" }
  | { view: "notfound" };

function parseHash(raw: string): Route {
  // raw includes the leading "#"
  const hash = raw.replace(/^#/, "");
  if (!hash || hash === "/") return { view: "home" };

  // Split path and query (e.g. /comparator?f=id)
  const [path, query] = hash.split("?");
  const segments = path.split("/").filter(Boolean); // ["comparator"] etc.

  if (segments.length === 0) return { view: "home" };

  const [first, second] = segments;

  if (first === "comparator") {
    const params = new URLSearchParams(query ?? "");
    return { view: "comparator", preselect: params.get("f") };
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
  if (first === "about") return { view: "about" };
  return { view: "notfound" };
}

export default function Home() {
  const [route, setRoute] = useState<Route>({ view: "home" });
  const [searchOpen, setSearchOpen] = useState(false);

  // Sync state with the URL hash.
  useEffect(() => {
    const sync = () => {
      setRoute(parseHash(window.location.hash));
      // Scroll to top on every route change for a clean SPA feel.
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

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
    if (route.view === "comparator") return "#/comparator";
    if (route.view === "category") return `#/category/${route.category === "comparison" ? "comparisons" : route.category === "layering" ? "layering" : "guides"}`;
    if (route.view === "article") return `#/article/${route.slug}`;
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
            key={route.preselect ?? "default"}
            initialFragranceId={route.preselect}
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

        {route.view === "notfound" && <NotFound onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} />

      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onNavigate={navigate}
      />
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

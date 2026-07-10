"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "scentduel:bookmarks";

export interface BookmarkItem {
  slug: string;
  title: string;
  label: string;
  category: string;
  savedAt: number; // epoch ms
}

let memoryCache: BookmarkItem[] = [];
const listeners = new Set<() => void>();

function notify() {
  for (const l of listeners) l();
}

function readFromStorage(): BookmarkItem[] {
  if (memoryCache.length > 0 || typeof window === "undefined") return memoryCache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as BookmarkItem[];
      if (Array.isArray(parsed)) memoryCache = parsed;
    }
  } catch {
    // no-op
  }
  return memoryCache;
}

function writeToStorage(next: BookmarkItem[]) {
  memoryCache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // no-op
  }
  notify();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/**
 * Bookmark/save duels in localStorage. Distinct from recently-viewed (passive)
 * — bookmarks are an explicit user action. Returns the list, a `toggle`
 * function, an `isSaved` check, and a `clear` function.
 */
export function useBookmarks() {
  const items = useSyncExternalStore(
    subscribe,
    readFromStorage,
    () => memoryCache // server snapshot
  );

  const isSaved = useCallback(
    (slug: string) => items.some((b) => b.slug === slug),
    [items]
  );

  const toggle = useCallback((item: Omit<BookmarkItem, "savedAt">) => {
    const exists = memoryCache.some((b) => b.slug === item.slug);
    const next = exists
      ? memoryCache.filter((b) => b.slug !== item.slug)
      : [{ ...item, savedAt: Date.now() }, ...memoryCache];
    writeToStorage(next);
  }, []);

  const remove = useCallback((slug: string) => {
    writeToStorage(memoryCache.filter((b) => b.slug !== slug));
  }, []);

  const clear = useCallback(() => {
    writeToStorage([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // no-op
    }
  }, []);

  return { items, isSaved, toggle, remove, clear };
}

"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "scentduel:recent";
const MAX_ITEMS = 6;

export interface RecentItem {
  slug: string;
  title: string;
  label: string;
  category: string;
  visitedAt: number; // epoch ms
}

// In-memory mirror so subscribed components re-render on writes, even though
// localStorage itself has no change event across tabs in this SPA.
let memoryCache: RecentItem[] = [];
const listeners = new Set<() => void>();

function notify() {
  for (const l of listeners) l();
}

function readFromStorage(): RecentItem[] {
  // memoryCache is the source of truth after the first read; only hit
  // localStorage on the very first load.
  if (memoryCache.length > 0) return memoryCache;
  if (typeof window === "undefined") return memoryCache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as RecentItem[];
      if (Array.isArray(parsed)) {
        memoryCache = parsed.slice(0, MAX_ITEMS);
      }
    }
  } catch {
    // localStorage may be unavailable (private mode); no-op.
  }
  return memoryCache;
}

function writeToStorage(next: RecentItem[]) {
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
 * Tracks recently-viewed article slugs in localStorage. Returns the list
 * (newest first) and a `track` function to record a visit.
 *
 * Uses useSyncExternalStore so there's no setState-in-effect — the store is
 * read synchronously (SSR-safe via the window guard in readFromStorage) and
 * writes notify all subscribers.
 */
export function useRecentlyViewed() {
  const items = useSyncExternalStore(
    subscribe,
    readFromStorage,
    () => memoryCache // server snapshot (empty)
  );

  const track = useCallback((item: Omit<RecentItem, "visitedAt">) => {
    const next = [
      { ...item, visitedAt: Date.now() },
      ...memoryCache.filter((p) => p.slug !== item.slug),
    ].slice(0, MAX_ITEMS);
    writeToStorage(next);
  }, []);

  const clear = useCallback(() => {
    writeToStorage([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // no-op
    }
  }, []);

  return { items, track, clear };
}

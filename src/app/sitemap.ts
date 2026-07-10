import type { MetadataRoute } from "next";
import { FRAGRANCES } from "@/lib/fragrance-data";
import { ARTICLES } from "@/lib/articles";

const SITE_URL = "https://scentduel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/#/comparator", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/#/find", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/#/families", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/#/glossary", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/#/category/comparisons", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/#/category/layering", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/#/category/guides", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/#/about", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  const articleRoutes = ARTICLES.map((a) => ({
    url: `/#/article/${a.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: new Date(a.updatedDate),
  }));

  const fragranceRoutes = FRAGRANCES.map((f) => ({
    url: `/#/fragrance/${f.id}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r.url}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...articleRoutes.map((r) => ({
      url: `${SITE_URL}${r.url}`,
      lastModified: r.lastModified ?? now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...fragranceRoutes.map((r) => ({
      url: `${SITE_URL}${r.url}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
  ];
}

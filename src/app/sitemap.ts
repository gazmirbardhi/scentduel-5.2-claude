import type { MetadataRoute } from "next";

const SITE_URL = "https://scentduel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/#/comparator", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/#/category/comparisons", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/#/category/layering", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/#/category/guides", priority: 0.7, changeFrequency: "monthly" as const },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

import { ARTICLES } from "@/lib/articles";
import { fragranceById } from "@/lib/fragrance-data";

export const dynamic = "force-static";

const SITE_URL = "https://scentduel.com";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed — generated at build time (force-static) and exported as
 * /rss.xml. Includes all published articles with the direct-answer capsule
 * as the description and the verdict headline.
 */
export async function GET(): Promise<Response> {
  const items = ARTICLES.map((a) => {
    const frags = a.fragrancesInvolved
      .map((id) => fragranceById(id)?.name ?? "")
      .filter(Boolean);
    const description = `${a.directAnswer} ${a.verdict ? `Verdict: ${a.verdict.title}.` : ""}`;
    return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${SITE_URL}/#/article/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/#/article/${a.slug}</guid>
      <description>${escapeXml(description)}</description>
      <category>${escapeXml(a.category)}</category>
      ${frags.map((f) => `<category>${escapeXml(f)}</category>`).join("\n      ")}
      <pubDate>${new Date(a.publishedDate).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(a.author.name)}</dc:creator>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ScentDuel — Fragrance Comparisons &amp; Tested Layering Combos</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Head-to-head fragrance duels, verified smells-like claims, and tested layering combinations. Specific, less-obvious pairs you can't find a clean answer to elsewhere.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

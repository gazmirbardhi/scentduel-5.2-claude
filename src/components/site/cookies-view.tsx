"use client";

import { LegalPage, LegalSection } from "./legal-page";

/**
 * Cookie policy. Explains: one functional cookie (theme preference via
 next-themes), no tracking/ad cookies, how to clear, browser settings.
 Route: #/cookies
 */
export function CookiesView({
  onNavigate,
}: {
  onNavigate: (hash: string) => void;
}) {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie policy"
      lastUpdated="July 2025"
      pageSlug="cookies"
      onNavigate={onNavigate}
      intro="ScentDuel uses exactly one cookie — for your light/dark theme preference. No tracking, no advertising, no analytics cookies. This page explains the details."
    >
      <LegalSection heading="Cookies we use">
        <p>
          ScentDuel uses a single functional cookie set by the{" "}
          <code className="rounded bg-surface-elevated px-1 py-0.5 text-sm">next-themes</code> library:
        </p>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-surface-elevated">
                <th className="px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">Cookie</th>
                <th className="px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">Purpose</th>
                <th className="px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">Duration</th>
                <th className="px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-2.5 font-mono text-xs text-foreground">theme</td>
                <td className="px-4 py-2.5 text-foreground/80">Stores your light/dark theme preference</td>
                <td className="px-4 py-2.5 text-foreground/80">1 year</td>
                <td className="px-4 py-2.5 text-foreground/80">Functional (non-tracking)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          This cookie does not track you across pages, sessions, or other
          websites. It exists solely so that when you toggle dark mode and
          return later, your preference is remembered.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies we do NOT use">
        <ul className="ml-1 space-y-2">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>No analytics cookies (no Google Analytics, no Plausible, no Fathom).</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>No advertising cookies (no Google Ads, no Meta Pixel, no LinkedIn Insight).</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>No third-party tracking cookies of any kind.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>No cookie consent banner — because there&apos;s nothing to consent to.</span>
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Local storage (not cookies)">
        <p>
          ScentDuel also uses <code className="rounded bg-surface-elevated px-1 py-0.5 text-sm">localStorage</code> for
          bookmarks and recently-viewed tracking. localStorage is not a cookie —
          it never leaves your browser and isn&apos;t sent to any server. See the{" "}
          <button
            onClick={() => onNavigate("#/privacy")}
            className="font-medium text-wine underline-offset-2 hover:underline"
          >
            privacy policy
          </button>{" "}
          for details.
        </p>
      </LegalSection>

      <LegalSection heading="Managing cookies">
        <p>
          The <code className="rounded bg-surface-elevated px-1 py-0.5 text-sm">theme</code> cookie
          can be cleared at any time via your browser&apos;s settings:
        </p>
        <ul className="ml-1 space-y-2">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span><strong className="text-foreground">Chrome:</strong> Settings → Privacy and security → Cookies and other site data.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span><strong className="text-foreground">Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span><strong className="text-foreground">Safari:</strong> Preferences → Privacy → Manage Website Data.</span>
          </li>
        </ul>
        <p>
          Clearing the cookie resets your theme to the default (light mode).
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          If we ever add a feature that requires a new cookie, we&apos;ll update
          this page and bump the &ldquo;last updated&rdquo; date. We will never
          silently add tracking cookies.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

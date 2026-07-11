"use client";

import { LegalPage, LegalSection } from "./legal-page";

/**
 * Privacy policy. Plain-English, covers: what we collect (almost nothing),
 * localStorage usage (bookmarks/recently-viewed), no cookies, no analytics
 * trackers, no third-party ad networks. Route: #/privacy
 */
export function PrivacyView({
  onNavigate,
}: {
  onNavigate: (hash: string) => void;
}) {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      lastUpdated="July 2026"
      pageSlug="privacy"
      onNavigate={onNavigate}
      intro="ScentDuel is a static website with no server, no analytics, and no advertising. This policy explains, in plain English, what little data we touch."
    >
      <LegalSection heading="The short version">
        <p>
          We don&apos;t collect personal data. We don&apos;t use tracking cookies.
          We don&apos;t run analytics. The only data stored on your device is your
          bookmarked and recently-viewed duels — and that stays in your browser,
          never sent to us.
        </p>
      </LegalSection>

      <LegalSection heading="What we don&apos;t collect">
        <ul className="ml-1 space-y-2">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>No analytics (no Google Analytics, no Plausible, no Fathom).</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>No tracking pixels or advertising networks.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>No server-side logs of your visits (there is no server runtime).</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>No account, email, or login system.</span>
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Local storage">
        <p>
          ScentDuel uses your browser&apos;s <code className="rounded bg-surface-elevated px-1 py-0.5 text-sm">localStorage</code> for two
          features:
        </p>
        <ul className="ml-1 space-y-2">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>
              <strong className="text-foreground">Bookmarks</strong> — duels you
              save with the bookmark button (key:{" "}
              <code className="rounded bg-surface-elevated px-1 py-0.5 text-sm">scentduel:bookmarks</code>).
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>
              <strong className="text-foreground">Recently viewed</strong> — the
              last 6 articles you opened (key:{" "}
              <code className="rounded bg-surface-elevated px-1 py-0.5 text-sm">scentduel:recent</code>).
            </span>
          </li>
        </ul>
        <p>
          This data never leaves your device. It&apos;s never sent to any server
          (there isn&apos;t one). You can clear it at any time from the home page
          (&ldquo;Clear&rdquo; / &ldquo;Clear all&rdquo;) or via your
          browser&apos;s site-data settings.
        </p>
      </LegalSection>

      <LegalSection heading="Theme preference">
        <p>
          Your light/dark theme choice is stored by{" "}
          <code className="rounded bg-surface-elevated px-1 py-0.5 text-sm">next-themes</code> in a
          cookie (<code className="rounded bg-surface-elevated px-1 py-0.5 text-sm">theme</code>). This
          is a functional preference cookie, not a tracking cookie. Light mode
          is the default.
        </p>
      </LegalSection>

      <LegalSection heading="External links">
        <p>
          Articles and tool pages may link to external fragrance retailers or
          reference sites. Those sites have their own privacy policies — we
          don&apos;t control or endorse them. We don&apos;t use affiliate
          tracking parameters on outbound links.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          If we ever add a feature that changes this picture (e.g. a newsletter
          signup), we&apos;ll update this page and bump the &ldquo;last
          updated&rdquo; date. We will never silently add tracking.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about privacy? Email{" "}
          <span className="font-medium text-foreground">privacy@scentduel.com</span>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

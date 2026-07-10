import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/site/theme-provider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://scentduel.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ScentDuel — Fragrance Comparisons & Tested Layering Combos",
    template: "%s · ScentDuel",
  },
  description:
    "Head-to-head fragrance duels, verified smells-like claims, and tested layering combinations. Specific, less-obvious pairs a beginner or intermediate collector can't find a clean answer to elsewhere.",
  keywords: [
    "fragrance comparison",
    "perfume duel",
    "fragrance layering",
    "perfume layering combos",
    "niche fragrance",
    "fragrance reviews",
    "scent comparator",
  ],
  authors: [{ name: "ScentDuel Editorial", url: siteUrl }],
  creator: "ScentDuel",
  applicationName: "ScentDuel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ScentDuel — Fragrance Comparisons & Tested Layering Combos",
    description:
      "Head-to-head fragrance duels, verified smells-like claims, and tested layering combinations. Specific, less-obvious pairs you can't find a clean answer to elsewhere.",
    url: siteUrl,
    siteName: "ScentDuel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScentDuel — Fragrance Comparisons & Tested Layering Combos",
    description:
      "Head-to-head fragrance duels, verified smells-like claims, and tested layering combinations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${publicSans.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

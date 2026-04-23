import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Triaged — Your inbox, on autopilot.",
  description:
    "AI reads every email, sorts it, summarizes threads, and drafts replies in your voice. All for five dollars a month.",
  openGraph: {
    title: "Triaged — Your inbox, on autopilot.",
    description:
      "AI reads every email, sorts it, summarizes threads, and drafts replies in your voice. All for five dollars a month.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=Triaged&accent=slate&category=Productivity",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=Triaged&accent=slate&category=Productivity",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}

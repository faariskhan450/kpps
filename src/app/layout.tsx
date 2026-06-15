import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { ChromeGate } from "@/components/chrome-gate";

// Elegant display serif for big headings
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

// Clean, modern sans for body text and UI
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Kids Planet School — Play. Learn. Grow.",
    template: "%s · Kids Planet School",
  },
  description:
    "Kids Planet School — a modern, nurturing school where children from playgroup to Class 5 explore, imagine, and grow.",
  keywords: [
    "Kids Planet School",
    "school",
    "playgroup",
    "nursery",
    "primary school",
    "admissions",
    "India",
  ],
  openGraph: {
    title: "Kids Planet School — Play. Learn. Grow.",
    description:
      "A modern, nurturing school where children from playgroup to Class 5 explore, imagine, and grow.",
    type: "website",
    locale: "en_IN",
    siteName: "Kids Planet School",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kids Planet School",
    description:
      "A modern, nurturing school where children from playgroup to Class 5 explore, imagine, and grow.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ChromeGate>{children}</ChromeGate>
      </body>
    </html>
  );
}

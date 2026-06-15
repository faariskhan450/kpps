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
  title: "Kids Planet School — Play. Learn. Grow.",
  description:
    "Kids Planet School — a modern, nurturing school where children from playgroup to Class 5 explore, imagine, and grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <ChromeGate>{children}</ChromeGate>
      </body>
    </html>
  );
}

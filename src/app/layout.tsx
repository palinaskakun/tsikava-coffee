import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "TSIKAVA | It means interesting",
    template: "%s | TSIKAVA",
  },
  description:
    "A modern coffee and tea concept inspired by Belarusian color, pattern, and culture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${bodyFont.variable} ${displayFont.variable}`}
      lang="en"
    >
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
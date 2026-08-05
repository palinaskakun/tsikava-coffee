import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { RouteBreadcrumb } from "@/components/layout/route-breadcrumb";
import "./globals.css";

const bodyFont = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
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
      className={bodyFont.variable}
      lang="en"
    >
      <body>
        <SiteHeader />
        <RouteBreadcrumb />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

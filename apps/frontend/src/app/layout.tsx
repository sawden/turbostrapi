import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { LocaleSwitch } from "@/components/locale-switch";
import { ThemeSwitch } from "@/components/theme-switch";
import { fetchLocales } from "@/lib/api";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TurboStrapi App",
  description: "Strapi starter with turborepo",
};

export async function generateStaticParams() {
  const locales = await fetchLocales();

  return locales.map((locale) => ({
    locale: locale.code,
  }));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="overflow-x-hidden" lang="en" suppressHydrationWarning>
      <body
        className={`relative min-h-screen overflow-x-hidden bg-background font-sans antialiased transition-[background] ${inter.className}`}
      >
        <Providers>
          <main className="flex min-h-screen flex-col items-center justify-between px-4 pb-28 pt-24 md:px-16">
            {children}
          </main>
          <LocaleSwitch className="fixed bottom-6 left-4 z-40 md:absolute md:bottom-2 md:left-2" />
          <ThemeSwitch className="fixed bottom-6 right-4 z-40 md:absolute md:bottom-2 md:right-2" />
        </Providers>
      </body>
    </html>
  );
}

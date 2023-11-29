import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeSwitch } from "@/components";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TurboStrapi App",
  description: "Strapi starter with turborepo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className="max-w-[100vw] overflow-x-hidden"
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`relative min-h-screen max-w-[100vw] overflow-x-hidden bg-background font-sans antialiased duration-200 ${inter.className}`}
      >
        <Providers>
          <main className="flex min-h-screen flex-col items-center justify-between px-4 pb-28 pt-24 md:px-16">
            {children}
          </main>
          <ThemeSwitch className="fixed bottom-6 right-4 z-40 md:absolute md:bottom-2 md:right-2" />
        </Providers>
      </body>
    </html>
  );
}

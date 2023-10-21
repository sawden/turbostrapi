import "./styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeSwitcher } from "../components";
import { ThemeProvider } from "./theme-provider";

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
        className={`relative min-h-screen max-w-[100vw] overflow-x-hidden font-sans antialiased ${inter.className} bg-background duration-200`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex min-h-screen flex-col items-center justify-between px-4 pb-28 pt-24 md:px-16">
            {children}
          </main>
          <ThemeSwitcher className="fixed bottom-6 right-4 z-40 md:absolute md:bottom-2 md:right-2" />
        </ThemeProvider>
      </body>
    </html>
  );
}

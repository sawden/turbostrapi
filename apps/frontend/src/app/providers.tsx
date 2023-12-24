"use client";

import { LocaleProvider } from "@/context/locale-context";
import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}

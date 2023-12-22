"use client";

import { ThemeProvider } from "next-themes";
import { LocaleProvider } from "./locale-context";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}

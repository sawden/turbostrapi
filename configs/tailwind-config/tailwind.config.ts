import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [""],
  theme: {
    extend: {
      screens: {
        "max-md": { max: "767px" },
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      willChange: {
        filter: "filter",
      },
    },
  },
  plugins: [],
} satisfies Config;

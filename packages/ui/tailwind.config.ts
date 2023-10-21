import path from "path";
import type { Config } from "tailwindcss";

import baseConfig from "@turbostrapi/tailwind-config";

export const contentPath = path.join(
  path.dirname(require.resolve("@turbostrapi/ui")),
  "src/**/*.{ts,tsx}",
);

export default {
  content: [contentPath],
  presets: [baseConfig],
} satisfies Config;

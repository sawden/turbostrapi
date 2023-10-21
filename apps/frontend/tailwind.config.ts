import type { Config } from "tailwindcss";

import baseConfig from "@turbostrapi/tailwind-config";
import uiConfig, {
  contentPath as uiContentPath,
} from "@turbostrapi/ui/tailwind.config";

export default {
  content: [uiContentPath, "./src/**/*.{ts,tsx}"],
  presets: [baseConfig, uiConfig],
} satisfies Config;

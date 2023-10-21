/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */

/** @type { PrettierConfig | TailwindConfig } */

const config = {
  plugins: [
    "prettier-plugin-packagejson",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindFunctions: ["cva", "cx"],
};

export default config;

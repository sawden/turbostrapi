module.exports = {
  plugins: ["prettier-plugin-packagejson", "prettier-plugin-organize-imports"],
  /**
   * Fixes prettier formatting for tsconfig.json files with trailing commas.
   * @todo Remove this fix after https://github.com/prettier/prettier/issues/15956 is resolved.
   */
  overrides: [
    {
      files: ["tsconfig.json"],
      options: {
        trailingComma: "none",
      },
    },
  ],
};

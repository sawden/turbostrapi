/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ["plugin:@next/next/recommended"],
  ignorePatterns: [".next"],
};

module.exports = config;

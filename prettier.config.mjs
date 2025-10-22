// @ts-check

/**
 * @type {import("prettier").Config}
 */
const prettierConfig = {
  overrides: [
    {
      files: ["tsconfig.json", "tsconfig.*.json"],
      options: {
        parser: "jsonc",
      },
    },
  ],
  printWidth: 120,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
};

export default prettierConfig;

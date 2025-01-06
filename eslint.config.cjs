const prettier = require("eslint-plugin-prettier");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    ignores: ["node_modules", ".next", "dist"], // Игнорируемые папки
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      parser: tsParser, // Поддержка TypeScript
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettier,
    },
    rules: {
      "prettier/prettier": "error", // Интеграция Prettier
      "@typescript-eslint/no-unused-vars": "warn", // Пример правила
    },
  },
];

module.exports = [
  {
    ignores: ["node_modules", ".next", "dist"], // Игнорируемые папки
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      parser: tsParser, // Поддержка TypeScript
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettier,
    },
    rules: {
      "prettier/prettier": "error", // Интеграция Prettier
      "@typescript-eslint/no-unused-vars": "warn", // Пример правила
    },
  },
];

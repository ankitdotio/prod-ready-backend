import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ["src/**/*.ts"],

    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      "no-console": "error",
      quotes: ["error", "single", {
        allowTemplateLiterals: true,
      }],
    },
  },

  {
    ignores: [
      "dist",
      "node_modules",
      "*.config.js",
    ],
  },
);
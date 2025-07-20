import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import generatedBoundaries from "./eslint.boundaries.generated.mjs";
import prettier from "eslint-plugin-prettier";

export default [
  ...generatedBoundaries,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        console: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "prettier/prettier": "error",
    },
  },
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
];

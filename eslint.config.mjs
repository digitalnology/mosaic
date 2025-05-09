import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      ".github/*",
      ".pnp/*",
      ".yalc/*",
      "build/*",
      "coverage/*",
      "data/*",
      "dist/*",
      "docs/*",
      "node_modules/*",
      "tsconfig.json",
      "*.snap",
      "*.md",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs["recommended-latest"],

  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...reactPlugin.configs.flat.recommended,
  },

  {
    ignores: ["!.storybook"],
  },
  ...storybook.configs["flat/recommended"],

  {
    plugins: {
      prettier,
      "simple-import-sort": simpleImportSort,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    files: ["**/*.{mjs,js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      "prettier/prettier": ["error"],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"], // side effects
            ["^react", "^@?\\w"], // packages
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"], // parent imports
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"], // same folder
          ],
        },
      ],
      "no-unused-expressions": "off",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-var-requires": "warn",
    },
  },
];

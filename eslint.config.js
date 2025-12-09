import js from "@eslint/js";

const commonRules = {
  indent: ["error", 4],
  "linebreak-style": ["error", "unix"],
  quotes: ["error", "single"],
  semi: ["error", "always"],
  "no-console": "off",
};

export default [
  {
    ignores: ["**/dist/**", "**/node_modules/**", "eslint.config.js"],
  },
  {
    files: ["**/*.js"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...commonRules,
    },
  },
  {
    files: ["**/server.js", "**/src/server.js", "**/src/**/server.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...commonRules,
    },
  },
];

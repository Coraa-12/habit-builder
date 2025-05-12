import svelte from "eslint-plugin-svelte";
import parser from "svelte-eslint-parser"; // ✅ import as object

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser, // ✅ now a real object, not a string
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".svelte"],
      },
    },
    plugins: {
      svelte,
    },
    rules: {
      ...svelte.configs.recommended.rules,
    },
  },
];

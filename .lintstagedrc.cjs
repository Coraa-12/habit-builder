module.exports = {
  // Only lint & run related Vitest tests on JS/Svelte changes:
  "src/**/*.{js,svelte}": [
    "npm run lint",
    "npm run format",
    "npm run test:related"
  ],
  // CSS files only need formatting—and we re-stage them explicitly:
  "src/**/*.css": [
    "npm run format",
    // git add is needed because ESLint isn't handling CSS, so we must restage
    "git add"
  ]
};

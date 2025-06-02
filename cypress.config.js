const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Global settings
  requestTimeout: 15000,
  viewportHeight: 1020,
  viewportWidth: 1280,
  videoCompression: false,
  retries: {
    runMode: 2, // Retry failed tests 2 times in CI
    openMode: 0, // Don't retry in local development
  },
  env: {
    // Move API keys to env section for security
    MAILISK_API_KEY: "zs898rRiCENleCgCJhoY6pn78nOehWc_tiZl3RBaVAk",
    MAILISK_NAMESPACE: "p95jcxk5bcwj",
  },
  e2e: {
    setupNodeEvents(on, config) {},
    defaultCommandTimeout: 10000,
    requestTimeout: 15000, // This should match global or be higher
    responseTimeout: 30000,
    pageLoadTimeout: 30000,
  },
});

module.exports = defineConfig({
  env: {
    MAILISK_API_KEY: "zs898rRiCENleCgCJhoY6pn78nOehWc_tiZl3RBaVAk",
    MAILISK_NAMESPACE: "p95jcxk5bcwj",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

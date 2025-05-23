const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 15000,
  MAILISK_API_KEY: "zs898rRiCENleCgCJhoY6pn78nOehWc_tiZl3RBaVAk",
    MAILISK_NAMESPACE: "p95jcxk5bcwj",
  requestTimeout: 15000,
  viewportHeight: 1020,
  viewportWidth: 1280,
  videoCompression: false,
  e2e: {
    setupNodeEvents(on, config) {},
  },
})

module.exports = defineConfig({
  env: {
    MAILISK_API_KEY: "zs898rRiCENleCgCJhoY6pn78nOehWc_tiZl3RBaVAk",
    MAILISK_NAMESPACE: "p95jcxk5bcwj",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
})





import { defineConfig } from 'cypress';

// Environment configuration for different environments (e.g., dev, prod)
const ENV_CONFIG = {
  dev: {
    baseUrl: 'http://localhost:3000',
  },
  uat: {
    baseUrl: 'http://localhost:3000',
  },
  prod: {
    baseUrl: 'http://localhost:3000',
  },
};

export default defineConfig({
  e2e: {
    // Set up different environments for testing (dev or prod)
    setupNodeEvents(on, config) {
      // Custom event listeners can be added here, like logging or error handling
      // Example of logging environment name
      const environment = config.env.environment || 'dev'; // Default to dev
      console.log(`Running Cypress tests in ${environment} environment`);

      // Return the updated config object to Cypress
      return config;
    },

    // Configure baseUrl based on environment
    baseUrl: ENV_CONFIG.dev.baseUrl, // Default to dev, can be overridden

    env: {
      environment: 'dev',
      // loginUrl: "/",
      // dashboardUrl: "/",
    },

    //satndard resolution
    viewportWidth: 1280,
    viewportHeight: 720,

    video: false,
    videoCompression: 32,

    screenshotOnRunFailure: true,
  },
});

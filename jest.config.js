module.exports = {
  // Use jsdom environment to simulate browser
  testEnvironment: 'jsdom',

  // Test file patterns
  testMatch: [
    '**/tests/unit/**/*.test.js'
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'script.js',
    '!node_modules/**',
    '!tests/**'
  ],

  coverageDirectory: 'coverage',

  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 45,
      lines: 40,
      statements: 40
    }
  },

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js'],

  // Transform files
  transform: {},

  // Module name mapper for mocking
  moduleNameMapper: {},

  // Verbose output
  verbose: true
};

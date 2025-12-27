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
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
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

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Path ke aplikasi Next.js Anda untuk memuat next.config.js dan file .env
  dir: './',
})

// Konfigurasi kustom untuk Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/tests/e2e/'],
  moduleNameMapper: {
    // Menangani import CSS
    '^.+\\.(css|less|sass|scss)$': '<rootDir>/tests/mocks/styleMock.js',
    // Menangani alias folder
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
  },
}

module.exports = createJestConfig(customJestConfig)

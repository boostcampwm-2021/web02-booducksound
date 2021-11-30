module.exports = {
  testPathIgnorePatterns: ['./.next/', './node_modules/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^~/atoms/(.*)$': '<rootDir>/src/components/atoms/$1',
    '^~/molecules/(.*)$': '<rootDir>/src/components/molecules/$1',
    '^~/organisms/(.*)$': '<rootDir>/src/components/organisms/$1',
    '^~/types/(.*)$': '<rootDir>/src/types/$1',
    '^~/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^~/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^~/reducers/(.*)$': '<rootDir>/src/reducers/$1',
    '^~/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^~/actions/(.*)$': '<rootDir>/src/actions/$1',
    '^~/api/(.*)$': '<rootDir>/src/api/$1',
    '^~/constants/(.*)$': '<rootDir>/src/constants/$1',
  },
};

module.exports = {
  testPathIgnorePatterns: ['./.next/', './node_modules/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
};

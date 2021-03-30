module.exports = {
  setupFilesAfterEnv: [
    'jest-plugin-context/setup',
    './jest.setup',
  ],
  setupFiles: [
    'given2/setup',
  ],
};

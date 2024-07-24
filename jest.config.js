module.exports = {
  setupFilesAfterEnv: ["./test/jest-setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.svg": "<rootDir>/__mocks__/svg.js",
  },
};

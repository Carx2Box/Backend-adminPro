module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/config/**",
        "!**/coverage/**",
        "!**/jest.config.js",
    ],
    verbose: true
};
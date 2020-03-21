module.exports = {
  "cacheDirectory": "/tmp/jest/",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "**/assets/**/*.{js,jsx}",
    "**/helpers/**/*.{js,jsx}",
    "**/routes/**/*.{js,jsx}",
    "**/utilities/**/*.{js,jsx}",
    "!**/container/**",
    "!**/coverage/**",
    "!**/public/**"
  ],
  "coverageDirectory": "coverage",
  "coverageReporters": [
    "lcov",
    "text-summary"
  ],
  "transform": {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest"
  },
  "moduleNameMapper": {
    "\\.(css|pcss|scss|less)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js"
  },
  "notify": true,
  "testURL": "http:///127.0.0.1"
};

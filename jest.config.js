module.exports = {
  "cacheDirectory": "/tmp/jest/",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "**/assets/**/*.{js,jsx,ts,tsx}",
    "**/helpers/**/*.{js,jsx,ts,tsx}",
    "**/routes/**/*.{js,jsx,ts,tsx}",
    "**/utilities/**/*.{js,jsx,ts,tsx}",
    "!**/container/**",
    "!**/coverage/**",
    "!**/public/**"
  ],
  "coverageDirectory": "coverage",
  "coverageReporters": [
    "lcov",
    "text-summary"
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/enzyme.config.js"
  ],
  "silent": true,
  "transform": {
    "^.+\\.(js|jsx|mjs|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  "moduleNameMapper": {
    "\\.(css|pcss|scss|less)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js"
  },
  "notify": false,
  "testURL": "http:///127.0.0.1",
  "watchPlugins": [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};

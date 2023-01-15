module.exports = {
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.*\\.js$": "babel-jest",
    "^.*\\.mjs$": "babel-jest",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./setupTests.js"],
  collectCoverage: true,
  coverageReporters: ["text", "text-summary", "cobertura"],
  collectCoverageFrom: ["./src/**/*.{vue,ts}", "!./src/**/*.d.ts", "!./src/plugins/**/*.ts"],
  modulePathIgnorePatterns: ["main.ts", "env.d.ts", "App.vue"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/mocks/fileMock.js",
  },
};

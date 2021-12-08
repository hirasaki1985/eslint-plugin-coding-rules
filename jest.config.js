module.exports = {
  preset: "ts-jest",
  testMatch: ["**/test/**/*.test.ts"],
  moduleNameMapper: {
    "@exmpl/(.*)": "<rootDir>/src/$1",
  },
};

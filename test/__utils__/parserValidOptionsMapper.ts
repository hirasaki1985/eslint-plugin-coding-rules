import { Linter, RuleTester } from "eslint";

const defaultParserOptions: Linter.ParserOptions = {
  ecmaVersion: 2020,
  ecmaFeatures: {
    // experimentalObjectRestSpread: true,
    // jsx: false,
  },
  sourceType: "module",
};

export function parserValidOptionsMapper(
  rule: RuleTester.ValidTestCase
): RuleTester.ValidTestCase {
  return {
    ...rule,
    parserOptions: {
      ...defaultParserOptions,
    },
  };
}

export function parserInValidOptionsMapper(
  rule: RuleTester.InvalidTestCase
): RuleTester.InvalidTestCase {
  return {
    ...rule,
    parserOptions: {
      ...defaultParserOptions,
    },
  };
}

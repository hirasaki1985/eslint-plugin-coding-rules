import { Linter, RuleTester } from "eslint";

const defaultParserOptions: Linter.ParserOptions = {
  ecmaVersion: 2018,
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: false,
  },
  sourceType: "module",
};

export default function parserOptionsMapper({
  code,
  options = [],
  parserOptions = {},
}: RuleTester.ValidTestCase): RuleTester.ValidTestCase {
  return {
    code,
    options,
    parserOptions: {
      ...defaultParserOptions,
      ...parserOptions,
    },
  };
}

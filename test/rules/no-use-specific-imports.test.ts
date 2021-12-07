import { RuleTester } from "eslint";
import noUseSpecificImports from "../../src/rules/no-use-specific-imports";
import parserOptionsMapper from "../__utils__/parserOptionsMapper";

const ruleTester = new RuleTester();

ruleTester.run("noo-use-specific-imports", noUseSpecificImports, {
  valid: [
    {
      code: 'import { Rule } from "eslint"',
      filename: "service/",
    },
  ].map(parserOptionsMapper),
  invalid: [],
});

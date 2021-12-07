import { Rule } from "eslint";

const ruleModule: Rule.RuleModule = {
  meta: {},
  create: (context) => {
    console.log("no-use-specific-imports ruleModule()");
    console.log(context);
    return {
      onCodePathStart: (codePath, node) => {
        console.log("onCodePathStart");
        console.log({
          codePath,
          node,
        });
      },
      ImportDeclaration: (node) => {
        console.log("ImportDeclaration");
        console.log(node);
      },
    };
  },
};

export default ruleModule;

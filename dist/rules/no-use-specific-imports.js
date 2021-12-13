"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ruleModule = void 0;
const NoUseSpecificImportsService_1 = require("../services/NoUseSpecificImportsService");
/*
const configRuleItem = {
  type: "array",
  items: {
    anyOf: [
      { type: "string" },
      {
        type: "object",
        properties: {
          filePath: {
            type: "array",
            item: {
              type: "string",
              minLength: 1,
            },
          },
          importName: {
            type: "array",
            item: {
              type: "string",
              minLength: 1,
            },
          },
          message: {
            type: "string",
            minLength: 1,
          },
          required: ["filePath", "importName"],
        },
        additionalProperties: false,
      },
    ],
  },
};
*/
/**
 * RuleModule
 */
const _ruleModule = {
    meta: {
        docs: {
            description: "Disallow specific imports from specific dirs or source files.",
        },
        type: "suggestion",
        messages: {
            invalidOptionsFormat: "options format is wrong.",
            invalidImport: "'{{importSource}}' can not import '{{importFrom}}'",
        },
        /*
        schema: {
          anyOf: [
            configRuleItem,
            {
              type: "array",
              item: [
                {
                  type: "object",
                  properties: configRuleItem,
                  additionalProperties: false,
                },
              ],
              additionalProperties: false,
            },
          ],
        },
        */
    },
    create(context) {
        const options = context.options;
        const targetFilePath = context.getPhysicalFilename();
        /**
         * checkOptionFormat
         */
        // const checkOptionFormat = () => {
        //   // console.log(options);
        // };
        /**
         * checkNode
         */
        const checkNode = (node) => {
            var _a;
            const importFrom = ((_a = node === null || node === void 0 ? void 0 : node.source) === null || _a === void 0 ? void 0 : _a.value) || "";
            if (typeof importFrom === "string") {
                // check allow import
                const isAllow = (0, NoUseSpecificImportsService_1.isAllowImport)(options, targetFilePath, importFrom);
                // not allow
                if (!isAllow) {
                    const errorConfig = (0, NoUseSpecificImportsService_1.getNotAllowImport)(options, targetFilePath, importFrom);
                    // custom message
                    if (errorConfig && errorConfig.message) {
                        // create report
                        context.report({
                            node,
                            message: errorConfig.message,
                            data: {
                                importSource: targetFilePath,
                                importFrom,
                            },
                        });
                    }
                    else {
                        // create report
                        context.report({
                            node,
                            messageId: "invalidImport",
                            data: {
                                importSource: targetFilePath,
                                importFrom,
                            },
                        });
                    }
                }
            }
        };
        return {
            // onCodePathStart: (codePath: Rule.CodePath, node: Rule.Node) => {
            //   console.log({
            //     codePath,
            //   });
            // },
            ImportDeclaration: checkNode,
            ExportNamedDeclaration(node) {
                if (node.source) {
                    checkNode(node);
                }
            },
            // ExportAllDeclaration: checkNode,
        };
    },
};
exports.ruleModule = _ruleModule;
//# sourceMappingURL=no-use-specific-imports.js.map
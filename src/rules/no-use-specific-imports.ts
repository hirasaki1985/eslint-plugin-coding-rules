import { Rule } from "eslint";
import * as ESTree from "estree";
import {
  getNotAllowImport,
  isAllowImport,
} from "../services/NoUseSpecificImportsService";

/**
 * type
 */
export type NoUseSpecificImportsConfig = NoUseSpecificImportsConfigItem[];

export interface NoUseSpecificImportsConfigItem {
  filePath: string | string[];
  importName: string | string[];
  message?: string;
}

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
const _ruleModule: Rule.RuleModule = {
  meta: {
    docs: {
      description:
        "Disallow specific imports from specific dirs or source files.",
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
  create(context: Rule.RuleContext): Rule.RuleListener {
    const options = context.options;
    const targetFilePath = context.getPhysicalFilename();

    const pluginOptions: NoUseSpecificImportsConfig =
      options != null && Array.isArray(options) && options.length > 0
        ? options[0]
        : [];

    /**
     * checkOptionFormat
     */
    // const checkOptionFormat = () => {
    //   // console.log(options);
    // };

    /**
     * checkNode
     */
    const checkNode = (
      node:
        | (ESTree.ImportDeclaration & Rule.NodeParentExtension)
        | (ESTree.ExportNamedDeclaration & Rule.NodeParentExtension)
    ) => {
      const importFrom = node?.source?.value || "";

      if (typeof importFrom === "string") {
        // check allow import
        const isAllow = isAllowImport(
          pluginOptions,
          targetFilePath,
          importFrom
        );

        // not allow
        if (!isAllow) {
          const errorConfig = getNotAllowImport(
            pluginOptions,
            targetFilePath,
            importFrom
          );

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
          } else {
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

// export const noUserSpecificImportsRuleModule = _noUserSpecificImportsRuleModule;
export const ruleModule = _ruleModule;

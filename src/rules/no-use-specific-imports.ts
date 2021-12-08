import { Rule } from "eslint";
import * as ESTree from "estree";
import { isAllowImport } from "../services/NoUseSpecificImportsService";

/**
 * type
 */
export type NoUseSpecificImportsConfig = NoUseSpecificImportsConfigItem[];

export interface NoUseSpecificImportsConfigItem {
  path: string | string[];
  import: string | string[];
  message?: string;
}

/**
 * RuleModule
 */
const ruleModule: Rule.RuleModule = {
  meta: {
    messages: {
      invalidOptionsFormat: "options format is wrong.",
      invalidImport: "'{{importSource}}' can not import '{{importFrom}}'",
    },
  },
  create(context: Rule.RuleContext): Rule.RuleListener {
    const options = context.options;
    const targetFilePath = context.getPhysicalFilename();
    /*
    console.log("no-use-specific-imports ruleModule()", {
      options,
      targetFilePath,
    });

    */

    /**
     * checkOptionFormat
     */
    const checkOptionFormat = () => {
      console.log(options);
    };

    /**
     * checkNode
     */
    const checkNode = (
      node:
        | (ESTree.ImportDeclaration & Rule.NodeParentExtension)
        | (ESTree.ExportNamedDeclaration & Rule.NodeParentExtension)
    ) => {
      const importFrom = node?.source?.value || "";

      console.log("ImportDeclaration", {
        targetFilePath,
        importFrom,
        options,
      });

      if (typeof importFrom === "string") {
        const isAllow = isAllowImport(
          options as NoUseSpecificImportsConfig,
          targetFilePath,
          importFrom
        );

        console.log({
          isAllow,
        });

        if (!isAllow) {
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
    };

    return {
      onCodePathStart: (codePath: Rule.CodePath, node: Rule.Node) => {
        console.log({
          codePath,
        });
      },
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

export default ruleModule;

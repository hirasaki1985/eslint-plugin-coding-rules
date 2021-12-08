import * as fs from "fs";
import { RuleTester } from "eslint";
import noUseSpecificImports from "../../src/rules/no-use-specific-imports";
import parserOptionsMapper from "../__utils__/parserOptionsMapper";

const ruleTester = new RuleTester();

const validFiles = ["./test/samples/react/components/atoms/ButtonAtom.tsx"];

const invalidFiles = [
  "./test/samples/react/components/atoms/InvalidAtom.tsx",
  "./test/samples/react/components/molecules/InvalidMolecules.tsx",
  "./test/samples/react/components/organisms/InvalidOrganisms.tsx",
  "./test/samples/react/modules/invalid/InvalidService.ts",
  "./test/samples/react/pages/InvalidPage.tsx",
  "./test/samples/react/stores/hooks/InvalidActionHook.ts",
];

ruleTester.run("no-use-specific-imports", noUseSpecificImports, {
  valid: validFiles
    .map((_filePath) => {
      return {
        // code: loadSampleSourceFile(_filePath),
        code: "import React from 'react'",
        filename: _filePath,
        options: [
          {
            path: "**/react/components/atoms/**",
            import: "react-redux",
          },
        ],
      };
    })
    .map(parserOptionsMapper),
  invalid: [],
});

/**
 * loadSampleSourceFile
 */
function loadSampleSourceFile(path: string): string {
  if (path == null || path === "") return "";
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, "utf8");
  }
  return "";
}

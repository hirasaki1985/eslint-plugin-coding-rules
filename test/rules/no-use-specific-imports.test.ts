import { RuleTester } from "eslint";
import { ruleModule } from "../../src/rules/no-use-specific-imports";
import {
  parserValidOptionsMapper,
  parserInValidOptionsMapper,
} from "../__utils__/parserValidOptionsMapper";

/**
 * options
 */
const defaultLibraryOption = [
  0,
  [
    // redux, stores
    {
      filePath: [
        "**/components/atoms/**",
        "**/components/molecules/**",
        "**/components/organisms/**",
      ],
      importName: ["react-redux", "**/stores"],
    },

    // service
    {
      filePath: [
        "**/components/atoms/**",
        "**/components/molecules/**",
        "**/components/organisms/**",
        "**/pages/**",
      ],
      importName: ["**/*Service", "**/ServiceFactory"],
    },

    // repository
    {
      filePath: [
        "**/components/atoms/**",
        "**/components/molecules/**",
        "**/components/organisms/**",
        "**/pages/**",
        "**/stores/hooks/**",
      ],
      importName: "**/*Repository",
    },
  ],
];

const ruleTester = new RuleTester();

/**
 * run: no-use-specific-imports"
 */
ruleTester.run("no-use-specific-imports", ruleModule, {
  /**
   * valid
   */
  valid: [
    // other
    {
      filePath: "./test/samples/react/components/Toast.tsx",
      importName: "import React from 'react'",
      options: defaultLibraryOption,
    },

    // atom
    {
      filePath: "./test/samples/react/components/atoms/ButtonAtom.tsx",
      importName: "import React from 'react'",
      options: defaultLibraryOption,
    },
    {
      filePath: "./test/samples/react/components/atoms/ButtonAtom.tsx",
      importName: "import { Theme, useTheme } from '@material-ui/core'",
      options: defaultLibraryOption,
    },
    {
      filePath: "./test/samples/react/components/atoms/TextAtom.tsx",
      importName: "import moment from 'moment'",
      options: defaultLibraryOption,
    },
    {
      filePath: "./test/samples/react/components/atoms/TextAtom.tsx",
      importName:
        "import {\n" +
        "  CartesianGrid,\n" +
        "  Line,\n" +
        "  LineChart,\n" +
        "  ResponsiveContainer,\n" +
        "  Tooltip,\n" +
        "  XAxis,\n" +
        "  YAxis,\n" +
        "} from 'recharts'",
      options: defaultLibraryOption,
    },

    // molecules
    {
      filePath:
        "./test/samples/react/components/molecules/HealthCheckMolecules.tsx",
      importName: "import React from 'react'",
      options: defaultLibraryOption,
    },

    // organisms
    {
      filePath: "@/components/atoms/HealthCheckOrganisms.tsx",
      importName: "import React from 'react'",
      options: defaultLibraryOption,
    },

    // single
    {
      filePath: "./test/samples/react/components/atoms/TextAtom.tsx",
      importName: "import moment from 'moment'",
      options: [
        0,
        [
          {
            filePath: "**/components/atoms/**",
            importName: "react-redux",
          },
        ],
      ],
    },
  ]
    .map((_validFile) => {
      return {
        // code: loadSampleSourceFile(_filePath),
        code: _validFile.importName,
        filename: _validFile.filePath,
        options: _validFile.options,
      };
    })
    .map(parserValidOptionsMapper),

  /**
   * invalid
   */
  invalid: [
    // atoms
    {
      filename: "./test/samples/react/components/atoms/ButtonAtom.tsx",
      code: "import React from 'react-redux'",
      errors: [
        {
          message:
            "'./test/samples/react/components/atoms/ButtonAtom.tsx' can not import 'react-redux'",
          type: "ImportDeclaration",
        },
      ],
      options: defaultLibraryOption,
    },
    {
      filename: "./test/samples/react/components/atoms/ButtonAtom.tsx",
      code: "import ServiceFactory from '../../modules/ServiceFactory'",
      errors: [
        {
          message:
            "'./test/samples/react/components/atoms/ButtonAtom.tsx' can not import '../../modules/ServiceFactory'",
          type: "ImportDeclaration",
        },
      ],
      options: defaultLibraryOption,
    },

    // custom message
    {
      filename: "./test/samples/react/components/atoms/ButtonAtom.tsx",
      code: "import { RootState } from '../stores'",
      errors: [
        {
          message:
            "'./test/samples/react/components/atoms/ButtonAtom.tsx'からは'../stores'をインポートすることはできません。",
          type: "ImportDeclaration",
        },
      ],
      options: [
        0,
        [
          {
            filePath: ["**/components/atoms/**"],
            importName: ["react-redux", "**/stores"],
            message:
              "'{{importSource}}'からは'{{importFrom}}'をインポートすることはできません。",
          },
        ],
      ],
    },
  ]
    .map((_invalidFiles) => {
      return {
        // code: loadSampleSourceFile(_filePath),
        // ruleId: "no-use-specific-imports",
        // severity: 1,
        code: _invalidFiles.code,
        filename: _invalidFiles.filename,
        options: _invalidFiles.options,
        errors: _invalidFiles.errors,
      };
    })
    .map(parserInValidOptionsMapper),
});

/**
 * loadSampleSourceFile
 */
/*
function loadSampleSourceFile(path: string): string {
  if (path == null || path === "") return "";
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, "utf8");
  }
  return "";
}
*/

/*
// invalid files
"./test/samples/react/components/atoms/InvalidAtom.tsx",
"./test/samples/react/components/molecules/InvalidMolecules.tsx",
"./test/samples/react/components/organisms/InvalidOrganisms.tsx",
"./test/samples/react/modules/invalid/InvalidService.ts",
"./test/samples/react/pages/InvalidPage.tsx",
"./test/samples/react/stores/hooks/InvalidActionHook.ts",
*/

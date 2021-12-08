import {
  isAllowImport,
  isMatchPattern,
} from "../../src/services/NoUseSpecificImportsService";
import { NoUseSpecificImportsConfig } from "../../src/rules/no-use-specific-imports";

const pluginConfig: NoUseSpecificImportsConfig = [
  {
    path: [
      "**/components/atoms/**",
      "**/components/molecules/**",
      "**/components/organisms/**",
    ],
    import: ["react-redux", "**/stores"],
  },
  {
    path: [
      "**/components/atoms/**",
      "**/components/molecules/**",
      "**/components/organisms/**",
      "**/pages/**",
    ],
    import: ["**/*Service", "**/ServiceFactory"],
  },
  {
    path: [
      "**/components/atoms/**",
      "**/components/molecules/**",
      "**/components/organisms/**",
      "**/pages/**",
      "**/stores/hooks/**",
    ],
    import: "**/*Repository",
  },
];

/**
 * valid pattens
 */
const validPattens: {
  configs: NoUseSpecificImportsConfig;
  filePath: string;
  importLibraryName: string;
}[] = [
  {
    configs: pluginConfig,
    filePath: "components/atoms/ButtonAtom.tsx",
    importLibraryName: "material-ui",
  },
  {
    configs: pluginConfig,
    filePath: "components/molecules/TestMolecules.tsx",
    importLibraryName: "material-ui",
  },
  {
    configs: pluginConfig,
    filePath: "components/organisms/TestOrganisms.tsx",
    importLibraryName: "material-ui",
  },
  {
    configs: pluginConfig,
    filePath: "pages/MainPage.tsx",
    importLibraryName: "react-redux",
  },
  {
    configs: pluginConfig,
    filePath: "stores/hooks/HealthCheckActionHook.ts",
    importLibraryName: "ServiceFactory",
  },
  {
    configs: pluginConfig,
    filePath: "modules/health_check.ts",
    importLibraryName: "HealthCheckRepository",
  },
];

/**
 * invalid pattens
 */
const invalidPattens: {
  configs: NoUseSpecificImportsConfig;
  filePath: string;
  importLibraryName: string;
}[] = [
  // atoms
  {
    configs: pluginConfig,
    filePath: "components/atoms/InvalidAtom.tsx",
    importLibraryName: "react-redux",
  },
  {
    configs: pluginConfig,
    filePath: "components/atoms/InvalidAtom.tsx",
    importLibraryName: "../../stores",
  },
  {
    configs: pluginConfig,
    filePath: "components/atoms/InvalidAtom.tsx",
    importLibraryName: "../../modules/ServiceFactory",
  },
  {
    configs: pluginConfig,
    filePath: "components/atoms/InvalidAtom.tsx",
    importLibraryName: "../modules/health_check/HealthCheckService",
  },
  {
    configs: pluginConfig,
    filePath: "@/components/atoms/InvalidAtom.tsx",
    importLibraryName: "../modules/health_check/HealthCheckRepository",
  },

  // molecules
  {
    configs: pluginConfig,
    filePath: "components/molecules/InvalidMolecules.tsx",
    importLibraryName: "react-redux",
  },
  {
    configs: pluginConfig,
    filePath: "components/molecules/InvalidMolecules.tsx",
    importLibraryName: "../../stores",
  },
  {
    configs: pluginConfig,
    filePath: "components/molecules/InvalidMolecules.tsx",
    importLibraryName: "../../modules/ServiceFactory",
  },
  {
    configs: pluginConfig,
    filePath: "components/molecules/InvalidMolecules.tsx",
    importLibraryName: "../modules/health_check/HealthCheckService",
  },
  {
    configs: pluginConfig,
    filePath: "components/molecules/InvalidMolecules.tsx",
    importLibraryName: "../modules/health_check/HealthCheckRepository",
  },

  // organisms
  {
    configs: pluginConfig,
    filePath: "components/organisms/InvalidOrganisms.tsx",
    importLibraryName: "react-redux",
  },
  {
    configs: pluginConfig,
    filePath: "components/organisms/InvalidOrganisms.tsx",
    importLibraryName: "../../../stores",
  },
  {
    configs: pluginConfig,
    filePath: "components/organisms/InvalidOrganisms.tsx",
    importLibraryName: "../../modules/health_check/HealthCheckService",
  },
  {
    configs: pluginConfig,
    filePath: "components/organisms/InvalidOrganisms.tsx",
    importLibraryName: "../../modules/ServiceFactory",
  },
  {
    configs: pluginConfig,
    filePath: "components/organisms/InvalidOrganisms.tsx",
    importLibraryName: "../modules/health_check/HealthCheckRepository",
  },

  // pages
  {
    configs: pluginConfig,
    filePath: "pages/HealthCheckPage.tsx",
    importLibraryName: "../modules/health_check/HealthCheckService",
  },
  {
    configs: pluginConfig,
    filePath: "pages/HealthCheckPage.tsx",
    importLibraryName: "../../modules/ServiceFactory",
  },
  {
    configs: pluginConfig,
    filePath: "pages/HealthCheckPage.tsx",
    importLibraryName: "../modules/health_check/HealthCheckRepository",
  },

  // stores/hooks
  {
    configs: pluginConfig,
    filePath: "stores/hooks/HealthCheckActionHook.tsx",
    importLibraryName: "../../modules/health_check/HealthCheckRepository",
  },
];

/**
 * test: valid
 */
test("NoUseSpecificImportsService valid", async () => {
  validPattens.forEach((_item) => {
    expect(
      isAllowImport(_item.configs, _item.filePath, _item.importLibraryName)
    ).toBeTruthy();
  });
});

/**
 * test: invalid
 */
test("NoUseSpecificImportsService invalid", async () => {
  invalidPattens.forEach((_item) => {
    expect(
      !isAllowImport(_item.configs, _item.filePath, _item.importLibraryName)
    ).toBeTruthy();
  });
});

/**
 * test: isMatchPattern
 */
test("isMatchPattern", async () => {
  // ** first
  expect(
    isMatchPattern(
      "components/atoms/nestedAtom/ButtonAtom.tsx",
      "components/atoms/**"
    )
  ).toBeTruthy();
  expect(
    isMatchPattern(
      "components/atoms/nested/ButtonAtom.tsx",
      "components/atoms/**"
    )
  ).toBeTruthy();
  expect(
    isMatchPattern(
      "components/atoms/nested/../ButtonAtom.tsx",
      "components/atoms/**"
    )
  ).toBeTruthy();
  expect(
    !isMatchPattern(
      "components/organisms/nested/../HealthCheckOrganisms.tsx",
      "components/atoms/**"
    )
  ).toBeTruthy();
  expect(
    !isMatchPattern("pages/HealthCheckPage.tsx", "components/atoms/**")
  ).toBeTruthy();

  // ** middle
  expect(
    !isMatchPattern(
      "components/atom/Button.tsx",
      "components/atom/**/*Atom.tsx"
    )
  ).toBeTruthy();
  expect(
    isMatchPattern(
      "components/atom/nested/ButtonAtom.tsx",
      "components/atom/**/*Atom.tsx"
    )
  ).toBeTruthy();

  // ** last
  expect(isMatchPattern("../stores", "**/stores")).toBeTruthy();
  expect(isMatchPattern("../../../stores", "**/stores")).toBeTruthy();
  expect(isMatchPattern("../nested/../stores", "**/stores")).toBeTruthy();
  expect(isMatchPattern("./nested/./stores", "**/stores")).toBeTruthy();
  expect(isMatchPattern("./nested/../stores", "**/stores")).toBeTruthy();
  expect(isMatchPattern("../nested/./stores", "**/stores")).toBeTruthy();

  // @
  expect(
    isMatchPattern("@/data_sources/web_api/WebApiRequest", "**/WebApiRequest")
  ).toBeTruthy();

  // array
  expect(
    isMatchPattern("../nested/./stores", ["**/stores", "*Repository"])
  ).toBeTruthy();
  expect(
    isMatchPattern("../modules/health_check/HealthCheckRepository", [
      "**/stores",
      "**/*Repository",
    ])
  ).toBeTruthy();
  expect(
    isMatchPattern("../modules/health_check/HealthCheckRepository", [
      "**/*Repository",
      "**/stores",
    ])
  ).toBeTruthy();
  expect(
    !isMatchPattern("../modules/health_check/HealthCheckRepository", [
      "**/*Service",
      "**/stores",
    ])
  ).toBeTruthy();
  expect(
    !isMatchPattern("../modules/health_check/HealthCheckRepository", [
      "**/stores",
      "**/*Service",
    ])
  ).toBeTruthy();
});

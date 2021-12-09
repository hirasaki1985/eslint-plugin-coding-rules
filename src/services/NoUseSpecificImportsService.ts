import * as mm from "micromatch";
import {
  NoUseSpecificImportsConfig,
  NoUseSpecificImportsConfigItem,
} from "../rules/no-use-specific-imports";
import { strReplaceAll } from "../utils/StringUtil";

/**
 * isAllowImport
 * @return {boolean} true = allow, false = not allow
 */
export function isAllowImport(
  configs: NoUseSpecificImportsConfig,
  filePath: string,
  importLibraryName: string
): boolean {
  // validate
  if (configs == null && !Array.isArray(configs)) return true;

  // config check loop
  return configs.every((_config) => {
    return checkAllowImport(_config, filePath, importLibraryName);
  });
}

/**
 * getNotAllowImport
 */
export function getNotAllowImport(
  configs: NoUseSpecificImportsConfig,
  filePath: string,
  importLibraryName: string
): NoUseSpecificImportsConfigItem | undefined {
  // validate
  if (configs == null && !Array.isArray(configs)) return;

  // config check loop
  return configs.find((_config) => {
    return !checkAllowImport(_config, filePath, importLibraryName);
  });
}

/**
 * checkAllowImport
 * @return {boolean} true = allow, false = not allow
 */
export function checkAllowImport(
  config: NoUseSpecificImportsConfigItem,
  filePath: string,
  importLibraryName: string
): boolean {
  // validate
  if (config.filePath == null || config.filePath === "") return true;
  if (config.importName == null || config.importName === "") return true;

  if (
    (typeof config.filePath === "string" || Array.isArray(config.filePath)) &&
    (typeof config.importName === "string" || Array.isArray(config.importName))
  ) {
    // check file path
    const isMatchFilePath = isMatchPattern(filePath, config.filePath);

    if (!isMatchFilePath) return true;

    // check import
    return !isMatchPattern(importLibraryName, config.importName);
  }

  return true;
}

/**
 * isMatchPattern
 * @param str
 * @param pattern
 * @param option
 */
export function isMatchPattern(
  str: string,
  pattern: string | string[],
  option: mm.Options = {
    basename: true,
    dot: false,
    strictSlashes: true,
    debug: true,
  }
): boolean {
  // validate
  if (str == null || str === "") return false;
  if (pattern == null || str === "") return false;

  // NOTE: '../' path doesn't work, and replace it.
  const replaceRule = { "../": "./", "././": "./", "/./": "/" };

  return mm.isMatch(strReplaceAll(str, replaceRule), pattern, option);
}

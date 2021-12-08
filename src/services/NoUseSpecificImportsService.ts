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
 * checkAllowImport
 * @return {boolean} true = allow, false = not allow
 */
export function checkAllowImport(
  config: NoUseSpecificImportsConfigItem,
  filePath: string,
  importLibraryName: string
): boolean {
  // validate
  if (config.path == null || config.path === "") return true;
  if (config.import == null || config.import === "") return true;

  if (
    (typeof config.path === "string" || Array.isArray(config.path)) &&
    (typeof config.import === "string" || Array.isArray(config.import))
  ) {
    // check file path
    const isMatchFilePath = isMatchPattern(filePath, config.path);

    if (!isMatchFilePath) return true;

    // check import
    return !isMatchPattern(importLibraryName, config.import);
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

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMatchPattern = exports.checkAllowImport = exports.getNotAllowImport = exports.isAllowImport = void 0;
const mm = __importStar(require("micromatch"));
const StringUtil_1 = require("../utils/StringUtil");
/**
 * isAllowImport
 * @return {boolean} true = allow, false = not allow
 */
function isAllowImport(configs, filePath, importLibraryName) {
    // validate
    if (configs == null && !Array.isArray(configs))
        return true;
    // config check loop
    return configs.every((_config) => {
        return checkAllowImport(_config, filePath, importLibraryName);
    });
}
exports.isAllowImport = isAllowImport;
/**
 * getNotAllowImport
 */
function getNotAllowImport(configs, filePath, importLibraryName) {
    // validate
    if (configs == null && !Array.isArray(configs))
        return;
    // config check loop
    return configs.find((_config) => {
        return !checkAllowImport(_config, filePath, importLibraryName);
    });
}
exports.getNotAllowImport = getNotAllowImport;
/**
 * checkAllowImport
 * @return {boolean} true = allow, false = not allow
 */
function checkAllowImport(config, filePath, importLibraryName) {
    // validate
    if (config.filePath == null || config.filePath === "")
        return true;
    if (config.importName == null || config.importName === "")
        return true;
    if ((typeof config.filePath === "string" || Array.isArray(config.filePath)) &&
        (typeof config.importName === "string" || Array.isArray(config.importName))) {
        // check file path
        const isMatchFilePath = isMatchPattern(filePath, config.filePath);
        if (!isMatchFilePath)
            return true;
        // check import
        return !isMatchPattern(importLibraryName, config.importName);
    }
    return true;
}
exports.checkAllowImport = checkAllowImport;
/**
 * isMatchPattern
 * @param str
 * @param pattern
 * @param option
 */
function isMatchPattern(str, pattern, option = {
    basename: true,
    dot: false,
    strictSlashes: true,
    debug: true,
}) {
    // validate
    if (str == null || str === "")
        return false;
    if (pattern == null || str === "")
        return false;
    // NOTE: '../' path doesn't work, and replace it.
    const replaceRule = { "../": "./", "././": "./", "/./": "/" };
    return mm.isMatch((0, StringUtil_1.strReplaceAll)(str, replaceRule), pattern, option);
}
exports.isMatchPattern = isMatchPattern;
//# sourceMappingURL=NoUseSpecificImportsService.js.map
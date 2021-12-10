"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeRegExp = exports.strReplaceAll = void 0;
function strReplaceAll(str, rules) {
    if (str == null || str === "")
        return "";
    if (rules == null)
        return str;
    let resultStr = str;
    Object.keys(rules).forEach((_item) => {
        const pattern = new RegExp(escapeRegExp(_item), "g");
        // eslint-disable-next-line no-underscore-dangle
        resultStr = resultStr.replace(pattern, String(rules[_item]));
    });
    return resultStr;
}
exports.strReplaceAll = strReplaceAll;
function escapeRegExp(str) {
    return str.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}
exports.escapeRegExp = escapeRegExp;
//# sourceMappingURL=StringUtil.js.map
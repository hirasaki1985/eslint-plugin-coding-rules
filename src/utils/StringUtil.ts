export function strReplaceAll(str: string, rules: { [key: string]: string }) {
  if (str == null || str === "") return "";
  if (rules == null) return str;

  let resultStr = str;
  Object.keys(rules).forEach((_item) => {
    const pattern = new RegExp(escapeRegExp(_item), "g");
    // eslint-disable-next-line no-underscore-dangle
    resultStr = resultStr.replace(pattern, String(rules[_item]));
  });

  return resultStr;
}

export function escapeRegExp(str: string) {
  return str.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}

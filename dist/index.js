"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.rules = void 0;
const no_use_specific_imports_1 = require("./rules/no-use-specific-imports");
exports.rules = {
    "no-use-specific-imports": no_use_specific_imports_1.ruleModule,
};
exports.configs = {
    all: {
        plugins: ["coding-rules"],
    },
};
//# sourceMappingURL=index.js.map
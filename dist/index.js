"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const no_use_specific_imports_1 = __importDefault(require("./rules/no-use-specific-imports"));
exports.default = {
    rules: {
        "no-use-specific-imports": no_use_specific_imports_1.default,
    },
    configs: {
        all: {
            plugins: ["coding-rules"],
        },
    },
};
//# sourceMappingURL=index.js.map
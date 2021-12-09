import noUseSpecificImports from "./rules/no-use-specific-imports";

export default {
  rules: {
    "no-use-specific-imports": noUseSpecificImports,
  },
  configs: {
    all: {
      plugins: ["coding-rules"],
    },
  },
};

import { ruleModule } from "./rules/no-use-specific-imports";

export const rules = {
  "no-use-specific-imports": ruleModule,
};

export const configs = {
  all: {
    plugins: ["coding-rules"],
  },
};

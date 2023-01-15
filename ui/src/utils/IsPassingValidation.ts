import { RuleI } from "../types/types";

export const isPassingValidation = (tested: string, rules: RuleI[]) =>
  rules.every((rule: RuleI) => rule(tested) === true);

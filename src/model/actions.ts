import { Maybe } from "../util";
import { Formula, Pattern, Rule } from "./formula";
import { Panel } from "./model";
import { Problem } from "./problem";

export interface ShowPanel {
  type: 'show-panel',
  panel: Panel,
}

export interface SelectRule {
  type: 'select-rule',
  rule: Rule,
}

interface SelectProblem {
  type: 'select-problem',
  problemId: Maybe<string>,
}

export interface BindPattern {
  type: 'bind-pattern',
  pattern: Pattern,
  formula: Formula,
}

export interface AddDerived {
  type: 'add-derived',
  formula: Formula,
}

export type Action = ShowPanel | SelectRule | SelectProblem | BindPattern | AddDerived;

export const Actions = {
  showPanel(panel: Panel): ShowPanel { return { type: 'show-panel', panel }; },
  selectRule(rule: Rule): SelectRule { return { type: 'select-rule', rule }; },
  selectProblem(problemId: Maybe<string>): SelectProblem { return { type: 'select-problem', problemId: problemId }; },
  bindPattern(pattern: Pattern, formula: Formula): BindPattern { return { type: 'bind-pattern', pattern, formula }; },
  addDerived(formula: Formula): AddDerived { return { type: 'add-derived', formula }; },
}
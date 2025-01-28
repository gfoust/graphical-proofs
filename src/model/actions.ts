import { Maybe } from "../util";
import { Formula, Pattern, Rule } from "./formula";
import { Panel } from "./model";

export type Action = ShowPanel | SelectRule | SelectProblem | BindPattern;

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
  formula: Formula,
  pattern: Pattern,
}

export const Actions = {
  showPanel(panel: Panel): ShowPanel { return { type: 'show-panel', panel }; },
  selectRule(rule: Rule): SelectRule { return { type: 'select-rule', rule }; },
}
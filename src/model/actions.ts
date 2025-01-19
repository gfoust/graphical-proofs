import { Rule } from "./formula";
import { Panel } from "./model";

export type Action = ShowPanel | SelectRule;

export interface ShowPanel {
  type: 'show-panel',
  panel: Panel,
}

export interface SelectRule {
  type: 'select-rule',
  rule: Rule
}

export const Actions = {
  showPanel(panel: Panel): ShowPanel { return { type: 'show-panel', panel }; },
  selectRule(rule: Rule): SelectRule { return { type: 'select-rule', rule }; },
}
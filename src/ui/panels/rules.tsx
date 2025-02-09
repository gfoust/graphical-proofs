import React from "react";

import App from "../../app";
import { Actions } from "../../model/actions";
import { Rule } from "../../model/pattern";
import RuleView from "../components/rule-view";
import { useScrollPosition } from "../scroll";

import "./rules.scss";

export interface RulesPanelProps {
  rules: Rule[];
}

export default function RulesPanel({ rules }: RulesPanelProps) {
  useScrollPosition("rule-list");

  let i = 0;
  return (
    <pf-rule-panel id="rule-list">
    {
      rules.map(rule =>
        <pf-rule-spacer key={i++}>
          <pf-rule-block onClick={() => App.dispatch(Actions.selectRule(rule))}>
            <RuleView rule={rule}/>
          </pf-rule-block>
        </pf-rule-spacer>
      )
    }
    </pf-rule-panel>
  )
}
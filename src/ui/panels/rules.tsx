import { Rule } from "../../model/formula";
import RuleView from "../rule-view";

import "./rules.scss";

export interface RulesPanelProps {
  rules: Rule[];
}

export default function RulesPanel({ rules }: RulesPanelProps) {
  return (
    <div>
      <h2>Rules</h2>
      <pf-rule-list>
      {
        rules.map(rule =>
          <RuleView rule={rule}/>
        )
      }
      </pf-rule-list>
    </div>
  )
}
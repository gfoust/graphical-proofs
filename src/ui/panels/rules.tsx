import App from "../../app";
import { Actions } from "../../model/actions";
import { Rule } from "../../model/pattern";
import RuleView from "../components/rule-view";

import "./rules.scss";

export interface RulesPanelProps {
  rules: Rule[];
}

function handleRuleClicked() {

}

export default function RulesPanel({ rules }: RulesPanelProps) {
  let i = 0;
  return (
    <pf-rule-list>
    {
      rules.map(rule =>
        <pf-rule-block key={i++} onClick={() => App.dispatch(Actions.selectRule(rule))}><RuleView rule={rule}/></pf-rule-block>
      )
    }
    </pf-rule-list>
  )
}
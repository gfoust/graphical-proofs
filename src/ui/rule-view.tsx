import { Rule } from "../model/formula";
import { PatternView } from "./pattern-view";

import "./rule-view.scss";

export interface RuleViewProps {
  rule: Rule;
}

export default function RuleView({ rule }: RuleViewProps) {
  return (
    <pf-rule-view>
      <pf-rule-name>
        {rule.name}
      </pf-rule-name>
      <pf-premises>
      {
        rule.premises.map(premise =>
          <PatternView pattern={premise}/>
        )
      }
      </pf-premises>
      <pf-consequences>
      {
        rule.consequences.map(consequence =>
          <PatternView pattern={consequence}/>
        )
      }
      </pf-consequences>
    </pf-rule-view>
  );
}

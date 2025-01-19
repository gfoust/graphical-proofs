import { Context } from "../../model/builder";
import { Rule, Var } from "../../model/formula";
import PatternView from "./pattern-view";

import "./rule-view.scss";

export interface RuleViewProps {
  rule: Rule;
  context?: Context;
  highlight?: Var;
  onMouseOverVariable?: (v: Var) => void;
  onMouseOutVariable?: () => void;
}

export default function RuleView({
  rule,
  context,
  highlight,
  onMouseOverVariable,
  onMouseOutVariable
}: RuleViewProps) {

  const commonProps = {
    context,
    highlight,
    onMouseOverVariable,
    onMouseOutVariable
  }

  console.log('highlight', highlight);
  return (
    <pf-rule-view>
      <pf-rule-name>
        {rule.name}
      </pf-rule-name>
      <pf-premises>
      {
        rule.premises.map(premise =>
          <PatternView pattern={premise} {...commonProps}/>
        )
      }
      </pf-premises>
      <pf-consequences>
      {
        rule.consequences.map(consequence =>
          <PatternView pattern={consequence} {...commonProps}/>
        )
      }
      </pf-consequences>
    </pf-rule-view>
  );
}

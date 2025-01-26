import { Context } from "../../model/builder";
import { Formula, Rule, Var } from "../../model/formula";
import PatternView from "./pattern-view";

import "./rule-view.scss";

export interface RuleViewProps {
  rule: Rule;
  context?: Context;
  highlight?: Var;
  selected?: Formula;
  onMouseOverVariable?: (v: Var) => void;
  onMouseOutVariable?: () => void;
}

export default function RuleView({
  rule,
  context,
  highlight,
  selected,
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
          <pf-formula-block><PatternView pattern={premise} {...commonProps}/></pf-formula-block>
        )
      }
      </pf-premises>
      <pf-consequences>
      {
        rule.consequences.map(consequence =>
          <pf-formula-block><PatternView pattern={consequence} {...commonProps}/></pf-formula-block>
        )
      }
      </pf-consequences>
    </pf-rule-view>
  );
}

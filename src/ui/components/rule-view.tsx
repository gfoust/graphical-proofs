import { BuilderRule, Context } from "../../model/builder";
import { Formula, Pattern, Var } from "../../model/formula";
import { PatternBlock } from "./pattern-view";

import "./rule-view.scss";

export interface RuleViewProps {
  rule: BuilderRule;
  context?: Context;
  highlight?: Var;
  candidate?: Formula;
  onMouseOverVariable?: (v: Var) => void;
  onMouseOutVariable?: () => void;
  onBind?: (pattern: Pattern, formula: Formula) => void;
}

export default function RuleView({
  rule,
  context,
  highlight,
  candidate,
  onMouseOverVariable,
  onMouseOutVariable,
  onBind,
}: RuleViewProps) {

  const commonProps = {
    context: context || {},
    candidate,
    highlight,
    onMouseOverVariable,
    onMouseOutVariable,
    onBind
  }

  let i = 0;

  console.log('highlight', highlight);
  return (
    <pf-rule-view>
      <pf-rule-name>
        {rule.name}
      </pf-rule-name>
      <pf-premises>
      {
        rule.premises.map(premise =>
          <PatternBlock key={i++} pattern={premise} {...commonProps}/>
        )
      }
      </pf-premises>
      <pf-consequences>
      {
        rule.consequences.map(consequence =>
          <PatternBlock key={i++} pattern={consequence} {...commonProps}/>
        )
      }
      </pf-consequences>
    </pf-rule-view>
  );
}

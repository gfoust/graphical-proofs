import { BuilderRule, Context } from "../../model/builder";
import { Formula, Pattern, Var } from "../../model/formula";
import { RefreshIcon } from "../icons";
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

  const premiseProps = {
    context: context || {},
    candidate,
    highlight,
    onMouseOverVariable,
    onMouseOutVariable,
    onBind
  }

  const consequenceProps = {
    context: context || {},
    highlight,
    onMouseOverVariable,
    onMouseOutVariable,
  }

  let i = 0;

  let complete = rule.premises.every(p => p.matched);

  return (
    <pf-rule-view>
      <pf-rule-name>
        {rule.name} <RefreshIcon/>
      </pf-rule-name>
      <pf-premises>
      {
        rule.premises.map(premise =>
          <PatternBlock key={i++} pattern={premise} {...premiseProps}/>
        )
      }
      </pf-premises>
      <pf-consequences className={complete ? 'complete' : ''}>
      {
        rule.consequences.map(consequence =>
          <PatternBlock key={i++} pattern={consequence} {...consequenceProps}/>
        )
      }
      </pf-consequences>
    </pf-rule-view>
  );
}

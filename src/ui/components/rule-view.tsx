import App from "../../app";
import { Actions } from "../../model/actions";
import { BuilderRule, Context, instantiatePattern } from "../../model/builder";
import { Formula, Pattern, Var } from "../../model/pattern";
import { RefreshIcon } from "./icons";
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

function saveHandler(pattern: Pattern, context: Context) {
  let formula = instantiatePattern(pattern, context);
  if (formula.type === 'formula') {
    return () => App.dispatch(Actions.addDerived(formula.value));
  }
  else {
    return undefined;
  }
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

  if (!context) context = [];

  const premiseProps = {
    context: context,
    candidate,
    highlight,
    onMouseOverVariable,
    onMouseOutVariable,
    onBind
  }

  const consequenceProps = {
    context: context,
    highlight,
    onMouseOverVariable,
    onMouseOutVariable,
  }

  let i = 0;

  let complete = rule.premises.every(p => p.status === 'matched');

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
          <pf-consequence key={i++}>
            <PatternBlock pattern={consequence} {...consequenceProps}/>
            {
              complete && consequence.status === 'unmatched'
                && <button type="button" className="btn btn-primary" onClick={saveHandler(consequence, context)}>Save</button>
            }
          </pf-consequence>
        )
      }
      </pf-consequences>
    </pf-rule-view>
  );
}

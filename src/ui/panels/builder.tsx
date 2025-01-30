import { useContext, useState } from "react";

import RuleView from "../components/rule-view";
import App from "../../app";
import { Formula, Pattern, Var } from "../../model/formula";
import FormulaPicker from "../components/formula-picker";

import "./builder.scss";
import { Maybe } from "../../util";
import { Actions } from "../../model/actions";

export interface BuilderPanelProps {
  givens: Formula[];
  derived: Formula[];
}

function bindPattern(pattern: Pattern, formula: Formula) {
  App.dispatch(Actions.bindPattern(pattern, formula));
}

export default function BuilderPanel({ givens, derived }: BuilderPanelProps) {
  const builder = useContext(App.BuilderContext);
  const [highlight, setHighlight] = useState<Maybe<Var>>(undefined);
  const [selected, setSelected] = useState<Maybe<Formula>>(undefined);

  if (builder) {
    return (
      <pf-builder-panel>
        <FormulaPicker givens={givens} derived={derived} selected={selected} onSelect={setSelected}/>
        <pf-builder-rule>
        {
          selected
          ? <RuleView
              rule={builder.rule}
              context={builder.context}
              candidate={selected}
              onBind={bindPattern}
            />
          : <RuleView
              rule={builder.rule}
              context={builder.context}
              highlight={highlight}
              onMouseOverVariable={setHighlight}
              onMouseOutVariable={() => setHighlight(undefined)}
            />
        }
        </pf-builder-rule>
      </pf-builder-panel>
    );
  }
  else {
    return (
      <div>
        <h2>No Rule Selected</h2>
      </div>
    );
  }
}
import { useContext, useState } from "react";

import RuleView from "../components/rule-view";
import App from "../../app";
import { Formula, Var } from "../../model/formula";
import FormulaPicker from "../components/formula-picker";

import "./builder.scss";
import { Maybe } from "../../util";

export interface BuilderPanelProps {
  givens: Formula[];
  derived: Formula[];
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
          <RuleView
            rule={builder.rule}
            context={builder.context}
            highlight={highlight}
            onMouseOverVariable={setHighlight}
            onMouseOutVariable={setHighlight as () => void}
          />
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
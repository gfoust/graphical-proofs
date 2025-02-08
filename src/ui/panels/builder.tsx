import React, { useContext, useState } from "react";

import App from "../../app";
import { Actions } from "../../model/actions";
import { Formula, Pattern, Var } from "../../model/pattern";
import { Maybe } from "../../util";
import RuleView from "../components/rule-view";

import "./builder.scss";
import { ButtonBar } from "../components/button-bar";
import { resetRule } from "../../model/builder";


export default function BuilderPanel() {
  const builder = useContext(App.BuilderContext);
  const selected = useContext(App.SelectedFormulaContext);
  const [highlight, setHighlight] = useState<Maybe<Var>>(undefined);

  function bindPattern(pattern: Pattern, formula: Formula) {
    App.dispatch(Actions.bindPattern(pattern, formula));
  }

  function resetBuilder() {
    if (builder) {
      App.dispatch(Actions.selectRule(resetRule(builder.rule)));
    }
  }

  if (builder) {
    return (
      <pf-builder-panel>
        <ButtonBar text="Reset" onClick={resetBuilder}/>
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
      <pf-builder-panel>
          <h2>No Rule Selected</h2>
      </pf-builder-panel>
    );
  }
}

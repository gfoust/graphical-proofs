import { useContext, useState } from "react";

import App from "../../app";
import { Actions } from "../../model/actions";
import { Palette } from "../../model/palette";
import { Formula, Pattern, Var } from "../../model/pattern";
import { Maybe } from "../../util";
import RuleView from "../components/rule-view";
import FormulaPicker from "../components/formula-picker";

import "./builder.scss";


export interface BuilderPanelProps {
}



function bindPattern(pattern: Pattern, formula: Formula) {
  App.dispatch(Actions.bindPattern(pattern, formula));
}



export default function BuilderPanel({}: BuilderPanelProps) {
  const palette = useContext(App.PaletteContext) as Palette;
  const builder = useContext(App.BuilderContext);
  const [highlight, setHighlight] = useState<Maybe<Var>>(undefined);
  const [selected, setSelected] = useState<Maybe<Formula>>(undefined);

  if (builder) {
    return (
      <pf-builder-panel>
        <FormulaPicker palette={palette} selected={selected} onSelect={setSelected}/>
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

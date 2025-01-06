import { Panel } from "../model/model";

import { BuilderPanel } from "./panels/builder";
import { GoalPanel } from "./panels/goal";
import { FormulasPanel } from "./panels/formulas";
import { RulesPanel } from "./panels/rules";

import './display.scss';


export interface DisplayProps {
  panel: Panel
}

const panelComponent = {
  [Panel.Builder]: BuilderPanel,
  [Panel.Goal]: GoalPanel,
  [Panel.Formulas]: FormulasPanel,
  [Panel.Rules]: RulesPanel,
}

export default function Display({ panel }: DisplayProps) {
  const Panel = panelComponent[panel]

  return (
    <proof-display>
      <Panel/>
    </proof-display>
  )
}

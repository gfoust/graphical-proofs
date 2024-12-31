import { Color, Formula } from "../../model/formula";
import FormulaView from "../formula-view";

import "./patterns.scss";

export interface PatternsPanelProps {
  formulas: Formula[];
}

export function PatternsPanel({ formulas }: PatternsPanelProps) {
  return (
    <proof-patterns-panel>
      <h1>Patterns</h1>
      <div>
      {
        formulas.map(formula => <FormulaView formula={formula}/>)
      }
      </div>
    </proof-patterns-panel>
  )
}

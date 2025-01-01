import { Formula } from "../../model/formula";
import FormulaView from "../formula-view";

import "./formulas.scss";

export interface FormulasPanelProps {
  formulas: Formula[];
}

export function FormulasPanel({ formulas }: FormulasPanelProps) {
  return (
    <proof-formulas-panel>
      <h1>Givens</h1>
      <div>
      {
        formulas.map(formula => <FormulaView formula={formula}/>)
      }
      </div>
    </proof-formulas-panel>
  )
}

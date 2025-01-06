import { Color, Formula } from "../../model/formula";
import { range } from "../../util";
import FormulaBlock from "../formula-view";

import "./formulas.scss";

export interface FormulasPanelProps {
  formulas: Formula[];
}

const colors = Object.values(Color);
function randomFormula(depth = 0): Formula {
  let type = 'atom';
  if (depth < 3) {
    let p = Math.random();
    if (depth == 0 && p < 0.6 || depth == 1 && p < 0.25 || depth == 2 && p < 0.1) {
      type = 'grid';
    }
  }

  if (type == 'atom') {
    let i = Math.floor(Math.random() * colors.length);
    return { type: 'atom', color: colors[i] };
  }
  else {
    return { type: 'grid', cells: range(0, 9).map(_ => randomFormula(depth + 1)) };
  }
}

export function FormulasPanel() {
  let formulas = range(0, 80).map(_ => randomFormula(0));
  return (
    <proof-formulas-panel>
      <h1>Givens</h1>
      <div>
      {
        formulas.map((formula, i) => <FormulaBlock key={'g' + i} formula={{ ...formula, id: 'g' + i }}/>)
      }
      </div>
    </proof-formulas-panel>
  )
}

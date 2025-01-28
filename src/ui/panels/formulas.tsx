import { Color, Formula } from "../../model/formula";
import { range } from "../../util";
import { FormulaBlock } from "../components/pattern-view";

import "./formulas.scss";

export interface FormulasPanelProps {
  givens: Formula[];
  derived: Formula[];
}

const colors = Object.values(Color);
function randomFormula(depth = 0, size = 0): Formula {
  if (size == 0) {
    size = Math.random() < 0.5 ? 4 : 9;
  }

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
    return { type: 'grid', cells: range(0, size).map(_ => randomFormula(depth + 1, 0)) };
  }
}

export default function FormulasPanel({ givens, derived }: FormulasPanelProps) {
  return (
    <pf-formulas-panel>
      <h2>Givens</h2>
      <div>
      {
        givens.map((formula, i) =>
          <FormulaBlock key={'g' + i} formula={formula}/>
        )
      }
      </div>
      { derived && derived.length > 0 &&
        <>
          <h2>Derived</h2>
          <div>
          {
            derived.map((formula, i) =>
              <FormulaBlock key={'d' + i} formula={formula}/>
            )
          }
          </div>
        </>
      }
    </pf-formulas-panel>
  );
}

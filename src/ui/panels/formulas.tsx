import { Color, Formula } from "../../model/formula";
import { range } from "../../util";
import { PatternView } from "../pattern-view";

import "./formulas.scss";

export interface FormulasPanelProps {
  givens: Formula[];
  derived: Formula[];
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

export default function FormulasPanel({ givens, derived }: FormulasPanelProps) {
  //let formulas = range(0, 80).map(_ => randomFormula(0));
  return (
    <pf-formulas-panel>
      <h2>Givens</h2>
      <div>
      {
        givens.map((formula, i) =>
          <pf-formula-block key={'g' + i}><PatternView pattern={formula}/></pf-formula-block>
        )
      }
      </div>
      { derived && derived.length > 0 &&
        <>
          <h2>Derived</h2>
          <div>
          {
            derived.map((formula, i) =>
              <pf-formula-block key={'g' + i}><PatternView pattern={formula}/></pf-formula-block>
            )
          }
          </div>
        </>
      }
    </pf-formulas-panel>
  );
}

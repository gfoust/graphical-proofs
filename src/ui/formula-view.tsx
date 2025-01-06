import { Color, Formula, TopLevelFormula } from "../model/formula";
import { range } from "../util";

import "./formula-view.scss";
import { PatternView } from "./pattern-view";

export interface FormulaBlockProps {
  formula: TopLevelFormula;
}

export interface FormulaViewProps {
  formula: Formula;
}

function pow(mantissa: number, exponent: number) {
  let n = 1;
  for (let i = 0; i < exponent; ++i) {
    n *= mantissa;
  }
  return n;
}

let cellCount = 0;
function formulaCell(formula: Formula, depth: number,  row: number, col: number) {
  if (formula.type == 'atom') {
    if (row == 0 && col == 0) {
      let span = pow(3, depth);
      return <td key={cellCount++} className={`${formula.color} d${depth}`} rowSpan={span} colSpan={span}></td>;
    }
    return undefined;
  }
  else if (depth < 1) {
    return <td key={cellCount++} className={`${Color.Black} d0`}></td>;
  }
  else {
    let scale = pow(3, depth - 1);
    let myRow = Math.trunc(row / scale);
    let myCol = Math.trunc(col / scale);
    let myIndex = myRow * 3 + myCol;

    let nestedRow = row % scale;
    let nestedCol = col % scale;

    return formulaCell(formula.cells[myIndex], depth - 1, nestedRow, nestedCol);
    // return <FormulaCell formula={formula.cells[myIndex]} depth={depth - 1} row={nestedRow} col={nestedCol}/>
  }
}

export function FormulaView({ formula }: FormulaViewProps) {
  cellCount = 0;
  return (
    <table className="proof-formula">
      <tbody>
      { range(0, 27).map(i =>
        <tr key={i}>
        { range(0, 27).map(j =>
          formulaCell(formula, 3, i, j)
        )}
        </tr>
      )}
      </tbody>
    </table>
  )
}

export default function FormulaBlock({ formula }: FormulaBlockProps) {
  return (
    <proof-formula-block><PatternView pattern={formula}/></proof-formula-block>
  )
}

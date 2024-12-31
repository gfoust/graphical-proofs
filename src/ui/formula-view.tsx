import { Formula } from "../model/formula";
import { range } from "../util";

import "./formula-view.scss";

export interface FormulaViewProps {
  formula: Formula;
}

export function FormulaView({ formula }: FormulaViewProps) {
  if (formula.type == 'atom') {
    return <proof-atom className={formula.color}></proof-atom>
  }
  else {
    let i = 0;
    return (
      <table className="proof-grid">
        <tbody>
        { range(0, 3).map(_ =>
            <tr>
            { range(0, 3).map(_ =>
                <td><FormulaView formula={formula.cells[i++]}/></td>
              )
            }
            </tr>
          )
        }
        </tbody>
      </table>
    );
  }
}

export default function FormulaBlock({ formula }: FormulaViewProps) {
  return (
    <proof-formula><FormulaView formula={formula}/></proof-formula>
  )
}
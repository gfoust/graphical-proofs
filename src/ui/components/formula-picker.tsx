import { Formula } from "../../model/formula";
import PatternView from "./pattern-view";

import "./formula-picker.scss";

export interface FormulaPickerProps {
  givens: Formula[];
  derived: Formula[];
}


export default function FormulaPicker({ givens, derived }: FormulaPickerProps) {
  return (
    <pf-formula-picker>
    {
      givens.map((formula, i) =>
        <pf-formula-block key={'g' + i}><PatternView pattern={formula}/></pf-formula-block>
      )
    }
    {
      derived.map((formula, i) =>
        <pf-formula-block key={'d' + i}><PatternView pattern={formula}/></pf-formula-block>            )
    }
    </pf-formula-picker>
  );
}
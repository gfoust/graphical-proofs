import { Formula } from "../../model/formula";
import PatternView from "./pattern-view";

import "./formula-picker.scss";
import { Maybe } from "../../util";

export interface FormulaPickerProps {
  givens: Formula[];
  derived: Formula[];
  selected?: Formula;
  onSelect: (formula: Maybe<Formula>) => void;
}


export default function FormulaPicker({ givens, derived, selected, onSelect }: FormulaPickerProps) {
  console.log('selected', selected)

  function clickHandler(formula: Formula) {
    console.log('click');
    if (onSelect) {
      if (formula === selected) {
        onSelect(undefined);
      }
      else {
        onSelect(formula);
      }
    }
  }

  return (
    <pf-formula-picker>
    {
      givens.map((formula, i) =>
        <pf-formula-block key={'g' + i} className={formula === selected ? "selected" : ""} onClick={() => clickHandler(formula)}><PatternView pattern={formula}/></pf-formula-block>
      )
    }
    {
      derived.map((formula, i) =>
        <pf-formula-block key={'d' + i}><PatternView pattern={formula}/></pf-formula-block>            )
    }
    </pf-formula-picker>
  );
}
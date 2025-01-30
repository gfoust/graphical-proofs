import { Formula } from "../../model/formula";
import { FormulaBlock } from "./pattern-view";

import "./formula-picker.scss";
import { Maybe } from "../../util";

export interface FormulaPickerProps {
  givens: Formula[];
  derived: Formula[];
  selected?: Formula;
  onSelect: (formula: Maybe<Formula>) => void;
}


export default function FormulaPicker({ givens, derived, selected, onSelect }: FormulaPickerProps) {

  function clickHandler(formula: Formula) {
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
        <FormulaBlock key={'g' + i} formula={formula} selected={formula === selected} onSelect={onSelect}/>
      )
    }
    {
      derived.map((formula, i) =>
        <FormulaBlock key={'d' + i} formula={formula} selected={formula === selected} onSelect={onSelect}/>
      )
    }
    </pf-formula-picker>
  );
}
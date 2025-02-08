import React, { useContext, useEffect } from "react";

import App from "../../app";
import { Palette } from "../../model/palette";
import { BaseFormula } from "../../model/pattern";
import { FormulaBlock } from "./pattern-view";

import "./formula-picker.scss";
import { useScrollPosition } from "../scroll";
import { Actions } from "../../model/actions";

export interface FormulaPickerProps {
  selectable: boolean;
}


export default function FormulaPicker({ selectable }: FormulaPickerProps) {
  useScrollPosition("formula-picker");
  const palette = useContext(App.PaletteContext) as Palette;
  const selectedFormula = useContext(App.SelectedFormulaContext);
  const added = useContext(App.AddedFormulaContext);

  useEffect(() => {
    if (added) {
      document.getElementById(added.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [added]);

  function formulaBlock(formula: BaseFormula) {
    if (selectable) {
      return <FormulaBlock
        key={formula.id}
        id={formula.id}
        formula={formula}
        added={formula === added}
        selected={formula === selectedFormula}
        onSelect={() => App.dispatch(Actions.selectFormula(formula))}
      />
    }
    else {
      return <FormulaBlock
        key={formula.id}
        id={formula.id}
        formula={formula}
      />
    }
  }

  return (
    <pf-formula-picker id="formula-picker" className={selectable ? "selectable" : undefined}>
    { palette.givens.map(formulaBlock)  }
    { palette.derived.map(formulaBlock) }
    </pf-formula-picker>
  );
}
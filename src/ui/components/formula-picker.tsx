import { useContext, useEffect } from "react";

import App from "../../app";
import { Palette } from "../../model/palette";
import { Formula } from "../../model/pattern";
import { Maybe } from "../../util";
import { FormulaBlock } from "./pattern-view";

import "./formula-picker.scss";
import { useScrollPosition } from "../scroll";

export interface FormulaPickerProps {
  palette: Palette,
  selected?: Formula,
  onSelect?: (formula: Maybe<Formula>) => void,
}


export default function FormulaPicker({ palette, selected, onSelect }: FormulaPickerProps) {
  useScrollPosition("formula-picker");
  const added = useContext(App.AddedFormulaContext);

  useEffect(() => {
    if (added) {
      document.getElementById(added.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [added]);

  return (
    <pf-formula-picker id="formula-picker">
    {
      palette.givens.map(formula =>
        <FormulaBlock
          key={formula.id}
          id={formula.id}
          formula={formula}
          selected={selected === formula}
          onSelect={onSelect}
        />
      )
    }
    {
      palette.derived.map(formula =>
        <FormulaBlock
          key={formula.id}
          id={formula.id}
          formula={formula}
          selected={selected === formula}
          added={added === formula}
          onSelect={onSelect}
        />
      )
    }
    </pf-formula-picker>
  );
}
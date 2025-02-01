import { useContext } from "react";

import App from "../../app";
import { FormulaBlock } from "../components/pattern-view";
import { Palette } from "../../model/palette";

import "./formulas.scss";


export interface FormulasPanelProps {
}



export default function FormulasPanel({}: FormulasPanelProps) {
  const palette = useContext(App.PaletteContext) as Palette;

  const givens = palette.givens;
  const derived = palette.derived;

  return (
    <pf-formulas-panel>
      <h2>Givens</h2>
      <div>
      {
        givens.map(formula =>
          <FormulaBlock
            key={formula.id}
            id={formula.id}
            formula={formula}
          />
        )
      }
      </div>
      { derived && derived.length > 0 &&
        <>
          <h2>Derived</h2>
          <div>
          {
            derived.map(formula =>
              <FormulaBlock
                key={formula.id}
                id={formula.id}
                formula={formula}
              />
            )
          }
          </div>
        </>
      }
    </pf-formulas-panel>
  );
}

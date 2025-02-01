import { useContext } from "react";

import App from "../../app";
import { FormulaBlock } from "../components/pattern-view";
import { paletteDerived, paletteGivens } from "../../model/palette";

import "./formulas.scss";


export interface FormulasPanelProps {
}



export default function FormulasPanel({}: FormulasPanelProps) {
  const palette = useContext(App.PaletteContext);
  console.log('palette', palette);

  const givens = paletteGivens(palette);
  const derived = paletteDerived(palette);

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

import { Maybe } from "../util";
import { Formula, BaseFormula } from "./pattern";
import { Problem } from "./problem";


export interface Palette {
  givens: BaseFormula[],
  derived: BaseFormula[],
}



export function addDerived(formula: Formula, palette: Palette): Palette {
  let f = formula as BaseFormula;
  f.id = 'd' + palette.derived.length;

  return {
    givens: palette.givens,
    derived: [...palette.derived, f]
  };
}



export function createPalette(problem: Problem): Palette {
  return {
    givens: problem.givens.map((f, i) => ({ ...f, id: 'g' + i })),
    derived: []
  };
}

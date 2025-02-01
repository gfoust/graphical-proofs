import { Maybe } from "../util";
import { Formula } from "./pattern";
import { Problem } from "./problem";


export interface Palette {
  formulas: Record<string, Formula>,
  givens: string[],
  derived: string[],
}



export function addDerived(formula: Formula, palette: Palette): Palette {
  let name = 'd' + palette.derived.length;

  let formulas = { ...palette.formulas, [name]: formula };
  let givens = palette.givens;
  let derived = [...palette.derived, name];

  return { formulas, givens, derived };
}



export function createPalette(problem: Problem): Palette {
  let formulas: Record<string, Formula> = {};
  let givens: string[] = [];
  for (let i = 0; i < problem.givens.length; ++i) {
    formulas['g' + i] = problem.givens[i];
    givens.push('g' + i);
  }
  return { formulas, givens, derived: [] };
}



export function paletteGivens(palette: Maybe<Palette>): Formula[] {
  return palette
    ? palette.givens.map(id => palette.formulas[id])
    : [];
}



export function paletteDerived(palette: Maybe<Palette>): Formula[] {
  return palette
    ? palette.derived.map(id => palette.formulas[id])
    : [];
}

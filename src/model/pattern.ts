
export enum Color {
  White = 'white',
  Red = 'red',
  Maroon = 'maroon',
  Orange = 'orange',
  Brown = 'brown',
  Yellow = 'yellow',
  Green = 'green',
  Forest = 'forest',
  Cyan = 'cyan',
  Turquoise = 'turquoise',
  Blue = 'blue',
  Sky = 'sky',
  Navy = 'navy',
  Purple = 'purple',
  Gray = 'gray',
  Black = 'black',
}



export interface Atom {
  type: 'atom',
  color: Color
}



export type Var = number;


export interface Variable {
  type: 'var',
  name: Var
}



export function varName(i: number) {
  if (i >= 0 && i < 10) {
    return "ABCDEFGHIJ".at(i);
  }
  else {
    return "?";
  }
}



export interface Grid<T> {
  type: 'grid',
  cells: T[]
}



export type Formula = (Atom | Grid<Formula>) & { height: number };



export type BaseFormula = Formula & { id: string };



export type Pattern = (Variable | Atom | Grid<Pattern>) & { height: number };



export function clonePattern(f: Formula): Formula;
export function clonePattern(p: Pattern): Pattern;
export function clonePattern(p: Pattern): Pattern {
  if (p.type == 'var') {
    return { type: 'var', name: p.name, height: 1 };
  }
  else if (p.type == 'atom') {
    return { type: 'atom', color: p.color, height: 1 };
  }
  else {
    return { type: 'grid', cells: p.cells.map(clonePattern), height: p.height };
  }
}



export interface Rule {
  name: string;
  premises: Pattern[],
  consequences: Pattern[],
}



export function cloneRule(rule: Rule): Rule {
  return {
    name: rule.name,
    premises: rule.premises.map(clonePattern),
    consequences: rule.consequences.map(clonePattern)
  };
}

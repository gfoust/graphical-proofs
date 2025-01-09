
export const enum Var {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I'
}

export enum Color {
  White = 'white',
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Cyan = 'cyan',
  Blue = 'blue',
  Purple = 'purple',
  Gray = 'gray',
  Black = 'black',
}

export interface Atom {
  type: 'atom',
  color: Color
}

export interface Variable {
  type: 'var',
  name: Var
}

export interface Grid<T> {
  type: 'grid',
  cells: T[]
}

export type Formula = Atom | Grid<Formula>;

export type TopLevelFormula = Formula & { id: string };

export type Pattern = Variable | Atom | Grid<Pattern>;

export function clonePattern(f: Formula): Formula;
export function clonePattern(p: Pattern): Pattern;
export function clonePattern(p: Pattern): Pattern {
  if (p.type == 'var') {
    return { type: 'var', name: p.name };
  }
  else if (p.type == 'atom') {
    return { type: 'atom', color: p.color };
  }
  else {
    return { type: 'grid', cells: p.cells.map(clonePattern) };
  }
}

export interface Rule {
  premises: Pattern[],
  consequences: Pattern[]
}

export function cloneRule(rule: Rule): Rule {
  return {
    premises: rule.premises.map(clonePattern),
    consequences: rule.premises.map(clonePattern)
  };
}
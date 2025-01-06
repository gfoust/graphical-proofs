
export const enum VarName {
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
  name: VarName
}

export interface Grid<T> {
  type: 'grid',
  cells: T[]
}

export type Formula = Atom | Grid<Formula>;

export type TopLevelFormula = Formula & { id: string };

export type Pattern = Variable | Atom | Grid<Pattern>;

export function clonePattern(f: Pattern): Pattern {
  if (f.type == 'var') {
    return { type: 'var', name: f.name };
  }
  else if (f.type == 'atom') {
    return { type: 'atom', color: f.color };
  }
  else {
    return { type: 'grid', cells: f.cells.map(clonePattern) };
  }
}

export interface Rule {
  premises: Pattern[],
  consequences: Pattern[]
}

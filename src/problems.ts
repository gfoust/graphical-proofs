import { Color, Formula, Pattern, Rule, Var } from "./model/pattern";
import { Problem } from "./model/problem";


function atom(color: Color): Formula {
  return { type: 'atom', color, height: 1 };
}

const Atom = {
  White: atom(Color.White),
  Red: atom(Color.Red),
  Orange: atom(Color.Orange),
  Yellow: atom(Color.Yellow),
  Green: atom(Color.Green),
  Cyan: atom(Color.Cyan),
  Blue: atom(Color.Blue),
  Purple: atom(Color.Purple),
  Gray: atom(Color.Gray),
  Black: atom(Color.Black)
};

function variable(name: Var): Pattern {
  return { type: 'var', name, height: 1 }
}

const Var = {
  A: variable(0),
  B: variable(1),
  C: variable(2),
  D: variable(3),
  E: variable(4),
  F: variable(5),
  G: variable(6),
  H: variable(7),
  I: variable(8),
  J: variable(9),
  K: variable(10),
  L: variable(11),
  M: variable(12),
  N: variable(13),
};

function grid(...cells: Formula[]): Formula;
function grid(...cells: Pattern[]): Pattern;
function grid(...cells: Pattern[]): Pattern {
  let cellsHeight = Math.max(...cells.map(cell => cell.height));
  return {
    type: 'grid',
    cells,
    height: cellsHeight + 1
  };
}

function altGrid(a: Formula, b: Formula, size: number): Formula {
  let cellsHeight = Math.max(a.height, b.height);
  let cells: Formula[] = [];
  for (let i = 0; i < size; ++i) {
    if (i % 2 === 0)
      cells.push(a);
    else
      cells.push(b);
  }
  return {
    type: 'grid',
    cells,
    height: cellsHeight = 1
  }
}

function implies(p: Formula, q: Formula): Formula;
function implies(p: Pattern, q: Pattern): Pattern;
function implies(p: Pattern, q: Pattern): Pattern {
  return {
    type: 'grid',
    cells: [
      p, Atom.White,
      Atom.White, q
    ],
    height: 2
  }
}

function and(p: Formula, q: Formula): Formula;
function and(p: Pattern, q: Pattern): Pattern;
function and(p: Pattern, q: Pattern): Pattern {
  return {
    type: 'grid',
    cells: [
      p, q,
      Atom.White, Atom.White
    ],
    height: 2
  }
}

function or(p: Formula, q: Formula): Formula;
function or(p: Pattern, q: Pattern): Pattern;
function or(p: Pattern, q: Pattern): Pattern {
  return {
    type: 'grid',
    cells: [
      p, Atom.White,
      q, Atom.White
    ],
    height: 2
  }
}

function not(p: Formula): Formula;
function not(p: Pattern): Pattern;
function not(p: Pattern): Pattern {
  return implies(p, Atom.Gray);
}


const rules2d: Readonly<Record<string, Rule>> = {
  swapper: {
    name: "Swapper",
    premises: [
      Var.A,
      implies(Var.A, Var.B)
    ],
    consequences: [
      Var.B
    ],
  },
  doubleSwapper: {
    name: "Double Swapper",
    premises: [
      or(Var.A, Var.B),
      implies(Var.A, Var.C),
      implies(Var.B, Var.C),
    ],
    consequences: [
      Var.C
    ]
  },
  breakdown: {
    name: "Break Down",
    premises: [
      and(Var.A, Var.B)
    ],
    consequences: [
      Var.A,
      Var.B
    ]
  },
  buildup: {
    name: "Build Up",
    premises: [
      Var.A,
      Var.B
    ],
    consequences: [
      and(Var.A, Var.B)
    ]
  },
  propagate: {
    name: "Propagate",
    premises: [
      implies(Var.A, Var.B),
      not(Var.B),
    ],
    consequences: [
      not(Var.A)
    ]
  },
  cancel: {
    name: "Cancel",
    premises: [
      not(not(Var.A)),
    ],
    consequences: [
      Var.A
    ]
  },
  pick: {
    name: "Pick",
    premises: [
      or(Var.A, Var.B),
      not(Var.A)
    ],
    consequences: [
      Var.B
    ]
  }

}

const rules3d: Readonly<Record<string, Rule>> = {
  flower: {
    name: "Flower",
    premises: [
      Var.A,
      Var.B,
      Var.C
    ],
    consequences: [
      grid(
        Var.A, Atom.White, Var.B,
        Atom.White, Var.C, Atom.White,
        Var.B, Atom.White, Var.A
      )
    ]
  },
  inverse: {
    name: "Inverse",
    premises: [
      grid(
        Var.A, Atom.White, Var.B,
        Atom.White, Var.K, Atom.White,
        Var.C, Atom.White, Var.D
      ),
    ],
    consequences: [
      grid(
        Atom.White, Var.A, Atom.White,
        Var.C, Atom.White, Var.B,
        Atom.White, Var.D, Atom.White
      )
    ]
  },
  merge: {
    name: "Merge",
    premises: [
      grid(
        Var.A, Atom.White, Var.C,
        Atom.White, Var.E, Atom.White,
        Var.G, Atom.White, Var.I
      ),
      grid(
        Atom.White, Var.B, Atom.White,
        Var.D, Atom.White, Var.F,
        Atom.White, Var.H, Atom.White
      )
    ],
    consequences: [
      grid(
        Var.A, Var.B, Var.C,
        Var.D, Var.E, Var.F,
        Var.G, Var.H, Var.I,
      )
    ]
  }
}

let a, b: Formula;
export const problemSet: readonly Readonly<Problem>[] = [
  {
    team: 1,
    tag: "A",
    givens: [
      Atom.Orange,
      implies(Atom.Orange, Atom.Purple),
      or(Atom.Red, Atom.Green),
      implies(Atom.Red, Atom.Blue),
      implies(Atom.Green, Atom.Blue),
    ],
    rules: [ rules2d.swapper, rules2d.doubleSwapper, rules2d.breakdown, rules2d.buildup ],
    goal: and(Atom.Blue, Atom.Purple)
  },
  { team: 1,
    tag: "B",
    givens: [
      not(Atom.Purple),
      implies(Atom.Green, Atom.Purple),
      implies(not(Atom.Yellow), Atom.Green),
    ],
    rules: [rules2d.propagate, rules2d.cancel],
    goal: Atom.Yellow
  },
  {
    team: 1,
    tag: "C",
    givens: [
      Atom.Purple,
      Atom.White
    ],
    rules: [rules3d.flower, rules3d.inverse, rules3d.merge],
    goal: grid(
      a = altGrid(Atom.Purple, Atom.White, 9), b = altGrid(Atom.White, Atom.Purple, 9), a,
      b, a, b,
      a, b, a
    )
  }
]

export default problemSet;

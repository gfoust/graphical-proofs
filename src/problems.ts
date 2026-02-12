import { Color, Formula, Pattern, Var } from "./model/pattern";
import { Problem } from "./model/problem";


function atom(color: Color): Formula {
  return { type: 'atom', color, height: 1 };
}

const Atom = {
  White: atom(Color.White),
  Red: atom(Color.Red),
  Maroon: atom(Color.Maroon),
  Orange: atom(Color.Orange),
  Brown: atom(Color.Brown),
  Yellow: atom(Color.Yellow),
  Green: atom(Color.Green),
  Forest: atom(Color.Forest),
  Cyan: atom(Color.Cyan),
  Turquoise: atom(Color.Turquoise),
  Blue: atom(Color.Blue),
  Sky: atom(Color.Sky),
  Navy: atom(Color.Navy),
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
  O: variable(14),
  P: variable(15),
  Q: variable(16),
  R: variable(17),
  S: variable(18),
  T: variable(19),
};

function grid(...cells: Formula[]): Formula;
function grid(...cells: Pattern[]): Pattern;
function grid(...cells: Pattern[]): Pattern {
  const cellsHeight = Math.max(...cells.map(cell => cell.height));
  return {
    type: 'grid',
    cells,
    height: cellsHeight + 1
  };
}

function altGrid(a: Formula, b: Formula, size: number): Formula {
  const cellsHeight = Math.max(a.height, b.height);
  const cells: Formula[] = [];
  for (let i = 0; i < size; ++i) {
    if (i % 2 === 0)
      cells.push(a);
    else
      cells.push(b);
  }
  return {
    type: 'grid',
    cells,
    height: cellsHeight + 1
  }
}

function implies(p: Formula, q: Formula): Formula;
function implies(p: Pattern, q: Pattern): Pattern;
function implies(p: Pattern, q: Pattern): Pattern {
  const cellsHeight = Math.max(p.height, q.height);
  return {
    type: 'grid',
    cells: [
      p, Atom.White,
      Atom.White, q
    ],
    height: cellsHeight + 1
  }
}

function and(p: Formula, q: Formula): Formula;
function and(p: Pattern, q: Pattern): Pattern;
function and(p: Pattern, q: Pattern): Pattern {
  const cellsHeight = Math.max(p.height, q.height);
  return {
    type: 'grid',
    cells: [
      p, q,
      Atom.White, Atom.White
    ],
    height: cellsHeight + 1
  }
}

function or(p: Formula, q: Formula): Formula;
function or(p: Pattern, q: Pattern): Pattern;
function or(p: Pattern, q: Pattern): Pattern {
  const cellsHeight = Math.max(p.height, q.height);
  return {
    type: 'grid',
    cells: [
      p, Atom.White,
      q, Atom.White
    ],
    height: cellsHeight + 1
  }
}

function not(p: Formula): Formula;
function not(p: Pattern): Pattern;
function not(p: Pattern): Pattern {
  return implies(p, Atom.Black);
}


function swap(p: Formula, q: Formula): Formula;
function swap(p: Pattern, q: Pattern): Pattern;
function swap(p: Pattern, q: Pattern): Pattern {
  return grid(
    p, Atom.White, Atom.White,
    Atom.White, Atom.Gray, Atom.White,
    Atom.White, Atom.White, q
  );
}

function sides(top: Formula, right: Formula, bottom: Formula, left: Formula): Formula;
function sides(top: Pattern, right: Pattern, bottom: Pattern, left: Pattern): Pattern;
function sides(top: Pattern, right: Pattern, bottom: Pattern, left: Pattern): Pattern {
  return grid(
    Atom.White, top, Atom.White,
    left, Atom.Gray, right,
    Atom.White, bottom, Atom.White
  );
}

function corners(topLeft: Formula, topRight: Formula, bottomRight: Formula, bottomLeft: Formula): Formula;
function corners(topLeft: Pattern, topRight: Pattern, bottomRight: Pattern, bottomLeft: Pattern): Pattern;
function corners(topLeft: Pattern, topRight: Pattern, bottomRight: Pattern, bottomLeft: Pattern): Pattern {
  return grid(
    topLeft, Atom.White, topRight,
    Atom.White, Atom.Gray, Atom.White,
    bottomLeft, Atom.White, bottomRight
  );
}


function vlines(a: Formula, b: Formula, c: Formula): Formula;
function vlines(a: Pattern, b: Pattern, c: Pattern): Pattern;
function vlines(a: Pattern, b: Pattern, c: Pattern): Pattern {
  return grid(
    a, b, c,
    a, b, c,
    a, b, c
  );
}


function hlines(a: Formula, b: Formula, c: Formula): Formula;
function hlines(a: Pattern, b: Pattern, c: Pattern): Pattern;
function hlines(a: Pattern, b: Pattern, c: Pattern): Pattern {
  return grid(
    a, a, a,
    b, b, b,
    c, c, c
  );
}


function square(a: Formula, b: Formula): Formula;
function square(a: Pattern, b: Pattern): Pattern;
function square(a: Pattern, b: Pattern): Pattern {
  return grid(
    a, a, a,
    a, b, a,
    a, a, a
  );
}


const r2 = {
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
  drop: {
    name: "Drop",
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
      or(Var.A, Atom.Black),
    ],
    consequences: [
      Var.A
    ]
  },
  innerSwap: {
    name: "Inner Swap",
    premises: [
      or(Var.A, Var.B),
      implies(Var.A, Var.C),
    ],
    consequences: [
      or(Var.C, Var.B)
    ]
  },
  twist: {
    name: "Twist",
    premises: [
      or(Var.A, Var.B)
    ],
    consequences: [
      or(Var.B, Var.A)
    ]
  },
  chain: {
    name: "Chain",
    premises: [
      implies(Var.A, Var.B),
      implies(Var.B, Var.C)
    ],
    consequences: [
      implies(Var.A, Var.C)
    ]
  }
}

const r3 = {
  swapper: {
    name: "Swapper",
    premises: [
      Var.A,
      swap(Var.A, Var.B)
    ],
    consequences: [
      Var.B
    ]
  },
  doubleSwapper: {
    name: "Double Swapper",
    premises: [
      sides(Atom.White, Var.B, Atom.White, Var.A),
      swap(Var.A, Var.C),
      swap(Var.B, Var.C)
    ],
    consequences: [
      Var.C
    ]
  },
  innerSwap: {
    name: "Inner Swap",
    premises: [
      Var.A,
      swap(Var.A, Var.B),
      sides(Var.C, Var.D, Var.E, Var.A)
    ],
    consequences: [
      sides(Var.C, Var.D, Var.E, Var.B)
    ]
  },
  rotateSides: {
    name: "Rotate Sides",
    premises: [
      sides(Var.A, Var.B, Var.C, Var.D)
    ],
    consequences: [
      sides(Var.D, Var.A, Var.B, Var.C),
      sides(Var.C, Var.D, Var.A, Var.B),
      sides(Var.B, Var.C, Var.D, Var.A),
    ]
  },
  rotateCorners: {
    name: "Rotate Corners",
    premises: [
      corners(Var.A, Var.B, Var.C, Var.D)
    ],
    consequences: [
      corners(Var.D, Var.A, Var.B, Var.C),
      corners(Var.C, Var.D, Var.A, Var.B),
      corners(Var.B, Var.C, Var.D, Var.A),
    ]
  },
  rotate: {
    name: "Rotate",
    premises: [
      grid(
        Var.A, Var.B, Var.C,
        Var.D, Var.E, Var.F,
        Var.G, Var.H, Var.I,
      )
    ],
    consequences: [
      grid(
        Var.G, Var.D, Var.A,
        Var.H, Var.E, Var.B,
        Var.I, Var.F, Var.C,
      ),
      grid(
        Var.I, Var.H, Var.G,
        Var.F, Var.E, Var.D,
        Var.C, Var.B, Var.A,
      ),
      grid(
        Var.C, Var.F, Var.I,
        Var.B, Var.E, Var.H,
        Var.A, Var.D, Var.G,
      )
    ]
  },
  twist: {
    name: "Twist",
    premises: [
      sides(Var.A, Var.C, Var.D, Var.B)
    ],
    consequences: [
      sides(Var.B, Var.C, Var.D, Var.A)
    ]
  },
  collapse: {
    name: "Collapse",
    premises: [
      sides(Var.A, Var.C, Var.A, Var.B)
    ],
    consequences: [
      swap(Var.B, Var.C)
    ]
  },
  splicer: {
    name: "Splicer",
    premises: [
      swap(Var.A, Var.K),
      corners(
        Atom.White, Var.B, Atom.White, Var.L
      )
    ],
    consequences: [
      swap(Var.A, Var.B)
    ]
  },
  replace: {
    name: "Replace",
    premises: [
      Var.B,
      sides(Var.A, Var.C, Var.D, Var.K)
    ],
    consequences: [
      sides(Var.A, Var.C, Var.D, Var.B)
    ]
  },
  nudge: {
    name: "Nudge",
    premises: [
      grid(
        Var.A, Var.B, Var.C,
        Var.D, Var.E, Var.F,
        Var.G, Var.H, Var.I,
      )
    ],
    consequences: [
      grid(
        Var.D, Var.A, Var.B,
        Var.G, Var.E, Var.C,
        Var.H, Var.I, Var.F,
      )
    ]
  },
  smasher: {
    name: "Smasher",
    premises: [
      corners(Var.A, Var.K, Var.L, Var.B),
      corners(Var.M, Var.C, Var.D, Var.N)
    ],
    consequences: [
      sides(Var.A, Var.C, Var.D, Var.B)
    ]
  },
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
  },
  lines: {
    name: "Lines",
    premises: [
      Var.A,
      Var.B,
      Var.C
    ],
    consequences: [
      hlines(Var.A, Var.B, Var.C)
    ]
  },
  joiner: {
    name: "Joiner",
    premises: [
      grid(
        Var.A, Var.B, Var.C,
        Var.K, Var.L, Var.F,
        Var.M, Var.N, Var.I
      ),
      grid(
        Var.O, Var.P, Var.Q,
        Var.D, Var.E, Var.R,
        Var.G, Var.H, Var.S
      )
    ],
    consequences: [
      grid(
        Var.A, Var.B, Var.C,
        Var.D, Var.E, Var.F,
        Var.G, Var.H, Var.I
      )
    ]
  }
}

let a, b, c: Formula;
export const problemSet: readonly Readonly<Problem>[] = [
  {
    team: "A",
    tag: 1,
    givens: [
      implies(Atom.Red, Atom.Blue),
      implies(Atom.Green, Atom.Yellow),
      or(Atom.Red, Atom.Green),
      implies(Atom.Yellow, Atom.Blue)
    ],
    rules: [ r2.doubleSwapper, r2.chain ],
    goal: Atom.Blue
  },
  {
    team: "B",
    tag: 1,
    givens: [
      not(not(not(Atom.Purple))),
      implies(Atom.Green, Atom.Purple),
      implies(not(Atom.Yellow), Atom.Green),
    ],
    rules: [r2.propagate, r2.drop],
    goal: Atom.Yellow
  },
  {
    team: "C",
    tag: 1,
    givens: [
      implies(Atom.Red, Atom.Black),
      or(Atom.Blue, Atom.Red)
    ],
    rules: [r2.innerSwap, r2.twist, r2.pick],
    goal: Atom.Blue
  },
  {
    team: "D",
    tag: 1,
    givens: [and(Atom.Red, Atom.Blue), implies(Atom.Red, Atom.Green)],
    rules: [r2.swapper, r2.breakdown, r2.buildup],
    goal: and(Atom.Red, and(Atom.Green, Atom.Blue)),
  },
  {
    team: "A",
    tag: 2,
    givens: [
      Atom.Blue,
      sides(Atom.Orange, Atom.Cyan, Atom.Blue, Atom.Orange)
    ],
    rules: [r3.swapper, r3.rotateSides, r3.twist, r3.collapse],
    goal: Atom.Cyan
  },
  {
    team: "B",
    tag: 2,
    givens: [
      Atom.Orange,
      corners(
        Atom.White,
        sides(
          Atom.White, Atom.Sky, Atom.White, Atom.Green
        ),
        Atom.White,
        Atom.White,
      )
    ],
    rules: [r3.swapper, r3.replace, r3.nudge],
    goal: Atom.Sky
  },
  {
    team: "C",
    tag: 2,
    givens: [
      swap(Atom.Red, swap(Atom.Cyan, Atom.Red)),
      swap(Atom.Forest, Atom.Purple),
      Atom.Forest,
    ],
    rules: [r3.swapper, r3.rotateCorners, r3.splicer],
    goal: Atom.Cyan
  },
  {
    team: "D",
    tag: 2,
    givens: [
      Atom.Yellow,
      corners(Atom.Maroon, Atom.Brown, Atom.Forest, Atom.Blue),
      corners(Atom.Brown, Atom.Turquoise, Atom.Yellow, Atom.Maroon)
    ],
    rules: [r3.swapper, r3.smasher, r3.rotateCorners, r3.collapse],
    goal: Atom.Blue
  },
  {
    team: "A",
    tag: 3,
    givens: [
      Atom.Purple,
      Atom.White
    ],
    rules: [r3.flower, r3.inverse, r3.merge],
    goal: grid(
      a = altGrid(Atom.Purple, Atom.White, 9), b = altGrid(Atom.White, Atom.Purple, 9), a,
      b, a, b,
      a, b, a
    )
  },
  {
    team: "B",
    tag: 3,
    givens: [
      Atom.Turquoise,
      Atom.White
    ],
    rules: [r3.flower, r3.inverse, r3.merge],
    goal: grid(
      Atom.White, a = vlines(Atom.Turquoise, Atom.White, Atom.Turquoise), Atom.White,
      b = hlines(Atom.Turquoise, Atom.White, Atom.Turquoise), square(Atom.Turquoise, Atom.White), b,
      Atom.White, a, Atom.White,
    )
  },
  {
    team: "C",
    tag: 3,
    givens: [
      Atom.White,
      Atom.Red,
      square(Atom.Blue, Atom.White)
    ],
    rules: [r3.rotate, r3.lines, r3.joiner],
    goal: grid(
      a = square(Atom.Blue, Atom.White), a, b = hlines(Atom.Red, Atom.White, Atom.Red),
      a, a, hlines(Atom.White, Atom.Red, Atom.White),
      b, b, b
    )
  },
  {
    team: "D",
    tag: 3,
    givens: [
      Atom.White,
      Atom.Blue,
    ],
    rules: [r3.rotate, r3.lines, r3.joiner],
    goal: grid(
      a = grid(Atom.Blue, Atom.Blue, Atom.Blue,
               Atom.White, Atom.White, Atom.White,
               Atom.Blue, Atom.White, Atom.Blue   ), a, a,
      b = grid(Atom.Blue, Atom.White, Atom.Blue,
               Atom.White, Atom.White, Atom.White,
               Atom.Blue, Atom.White, Atom.Blue,  ), b, b,
      c = grid(Atom.Blue, Atom.White, Atom.Blue,
               Atom.Blue, Atom.White, Atom.Blue,
               Atom.Blue, Atom.Blue, Atom.Blue  ), c, c
    )
  },
  {
    team: "A",
    tag: 4,
    givens: [
      Atom.Cyan,
      Atom.Yellow,
      corners(Atom.Brown, Atom.Red, Atom.Blue, Atom.Orange),
      corners(Atom.Yellow, Atom.Blue, Atom.Green, Atom.Purple),
      sides(Atom.Red, Atom.Purple, Atom.Yellow, Atom.Cyan)
    ],
    rules: [r3.swapper, r3.smasher, r3.collapse, r3.rotate, r3.innerSwap],
    goal: Atom.Purple
  },
  {
    team: "B",
    tag: 4,
    givens: [
      sides(Atom.Navy, Atom.Turquoise, Atom.Orange, Atom.Maroon),
      swap(Atom.Navy, Atom.Orange),
      Atom.Navy
    ],
    rules: [r3.swapper, r3.rotate, r3.splicer, r3.collapse, r3.innerSwap],
    goal: Atom.Turquoise
  },
  {
    team: "C",
    tag: 4,
    givens: [
      swap(Atom.Red, Atom.Blue),
      swap(Atom.Blue, Atom.Yellow),
      swap(Atom.Yellow, Atom.Red),
      sides(Atom.White, Atom.Red, Atom.White, Atom.Yellow)
    ],
    rules: [r3.rotate, r3.replace, r3.doubleSwapper],
    goal: Atom.Red
  },
  {
    team: "D",
    tag: 4,
    givens: [
      Atom.Cyan,
      corners(Atom.Cyan, Atom.Blue, Atom.Yellow, Atom.Forest)
    ],
    rules: [r3.swapper, r3.smasher, r3.rotate, r3.collapse],
    goal: Atom.Forest
  },
  {
    team: "X",
    tag: 1,
    givens: [
      Atom.Red,
      implies(and(Atom.Green, Atom.Yellow), Atom.Blue),
      implies(Atom.Red, Atom.Green),
      Atom.Yellow
    ],
    rules: [r2.swapper, r2.buildup],
    goal: Atom.Blue
  },
  { team: "X",
    tag: 2,
    givens: [
      Atom.Navy,
      sides(Atom.Navy, Atom.Forest, Atom.Maroon, Atom.Forest)
    ],
    rules: [r3.swapper, r3.rotateSides, r3.collapse],
    goal: Atom.Maroon
  },
  { team: "X",
    tag: 3,
    givens: [ Atom.Red, Atom.Orange, Atom.Yellow ],
    rules: [r3.flower],
    goal: grid(
      a = grid(
            b = grid(
                  Atom.Yellow, Atom.White, Atom.Yellow,
                  Atom.White,  Atom.Red,   Atom.White,
                  Atom.Yellow, Atom.White, Atom.Yellow,
            ), Atom.White, b,
            Atom.White, Atom.Orange, Atom.White,
            b, Atom.White, b
      ), Atom.White, a,
      Atom.White, Atom.Red, Atom.White,
      a, Atom.White, a
    )
  }
];

export const examples = [
]

export default problemSet;

// Skipped: 2A

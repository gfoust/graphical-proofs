import { Color, Formula, Pattern, Rule, Var } from "./model/pattern";
import { Problem } from "./model/problem";

function atom(color: Color): Formula {
  return { type: 'atom', color, height: 1 };
}

function variable(name: Var): Pattern {
  return { type: 'var', name, height: 1 }
}

function implies(p: Formula, q: Formula): Formula;
function implies(p: Pattern, q: Pattern): Pattern;
function implies(p: Pattern, q: Pattern): Pattern {
  return {
    type: 'grid',
    cells: [
      p, atom(Color.White),
      atom(Color.White), q
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
      atom(Color.White), atom(Color.White)
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
      p, atom(Color.White),
      q, atom(Color.White)
    ],
    height: 2
  }
}


const rules2d: Readonly<Record<string, Rule>> = {
  swapper: {
    name: "Swapper",
    premises: [
      variable(Var.A),
      implies(variable(Var.A), variable(Var.B))
    ],
    consequences: [
      variable(Var.B)
    ],
  },
  doubleSwapper: {
    name: "Double Swapper",
    premises: [
      or(variable(Var.A), variable(Var.B)),
      implies(variable(Var.A), variable(Var.C)),
      implies(variable(Var.B), variable(Var.C)),
    ],
    consequences: [
      variable(Var.C)
    ]
  },
  breakdown: {
    name: "Break Down",
    premises: [
      and(variable(Var.A), variable(Var.B))
    ],
    consequences: [
      variable(Var.A),
      variable(Var.B)
    ]
  },
  buildup: {
    name: "Build Up",
    premises: [
      variable(Var.A),
      variable(Var.B)
    ],
    consequences: [
      and(variable(Var.A), variable(Var.B))
    ]
  }
}

const rules3d: Readonly<Record<string, Rule>> = {
  flower: {
    name: "Flower",
    premises: [
      variable(Var.A),
      variable(Var.B),
      variable(Var.C)
    ],
    consequences: [
      { type: 'grid',
        cells: [
          variable(Var.A), atom(Color.White), variable(Var.B),
          atom(Color.White), variable(Var.C), atom(Color.White),
          variable(Var.B), atom(Color.White), variable(Var.A)
        ],
        height: 2
      }
    ]
  }
}

export const problemSet: readonly Readonly<Problem>[] = [
  {
    team: 1,
    tag: "A",
    givens: [
      atom(Color.Orange),
      implies(atom(Color.Orange), atom(Color.Purple)),
      or(atom(Color.Red), atom(Color.Green)),
      implies(atom(Color.Red), atom(Color.Blue)),
      implies(atom(Color.Green), atom(Color.Blue)),
    ],
    rules: [ rules2d.swapper, rules2d.doubleSwapper, rules2d.breakdown, rules2d.buildup ],
    goal: and(atom(Color.Blue), atom(Color.Purple))
  },
  {
    team: 1,
    tag: "B",
    givens: [
      atom(Color.Purple)
    ],
    rules: [rules3d.flower],
    goal: atom(Color.Blue)
  }
]

export default problemSet;

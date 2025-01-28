import { Color, Formula, Pattern, Rule, Var } from "./model/formula";
import { ProblemDefinition } from "./model/problem";

function atom(color: Color): Formula {
  return { type: 'atom', color };
}

function variable(name: Var): Pattern {
  return { type: 'var', name }
}

function implies(p: Formula, q: Formula): Formula;
function implies(p: Pattern, q: Pattern): Pattern;
function implies(p: Pattern, q: Pattern): Pattern {
  return {
    type: 'grid',
    cells: [
      p, atom(Color.White),
      atom(Color.White), q
    ]
  }
  return {
    type: 'grid',
    cells: [
      p,                 atom(Color.White), atom(Color.White),
      atom(Color.White), atom(Color.Gray),  atom(Color.White),
      atom(Color.White), atom(Color.White), q,
    ]
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
    ]
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
    ]
  }
}


const rules: Readonly<Record<string, Rule>> = {
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
  }
}

export const problemSet: readonly Readonly<ProblemDefinition>[] = [
  {
    team: 1,
    tag: "A",
    givens: [
      implies(atom(Color.Blue), atom(Color.Purple)),
      implies(atom(Color.Red), atom(Color.Blue)),
      implies(atom(Color.Green), atom(Color.Blue)),
      or(atom(Color.Red), atom(Color.Green)),
    ],
    rules: [ rules.swapper, rules.doubleSwapper, rules.breakdown ],
    goal: atom(Color.Blue)
  }
]

export default problemSet;

import { Color, Formula, Pattern, Var } from "./model/formula";
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
      p,                 atom(Color.White), atom(Color.White),
      atom(Color.White), atom(Color.Gray),  atom(Color.White),
      atom(Color.White), atom(Color.White), q,
    ]
  }
}

export const problemDefs: readonly Readonly<ProblemDefinition>[] = [
  {
    team: 1,
    tag: "A",
    givens: [
      atom(Color.Red),
      implies(atom(Color.Red), atom(Color.Blue))
    ],
    rules: [
      { name: "Swapper",
        premises: [
          variable(Var.A),
          implies(variable(Var.A), variable(Var.B))
        ],
        consequences: [
          variable(Var.B)
        ],
      },
    ],
    goal: atom(Color.Blue)
  }
]

export default problemDefs;

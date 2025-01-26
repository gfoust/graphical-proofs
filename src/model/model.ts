import { instantiateProblem, Problem, ProblemIdentifier, problemIdString } from "./problem";

import problemDefs from "../problems";
import { Builder } from "./builder";

export enum Panel {
  Builder = 'builder',
  Goal = 'goal',
  Formulas = 'formulas',
  Rules = 'rules'
}

export interface Model {
  panel: Panel,
  problemIds: ProblemIdentifier[],
  problems: Record<string, Problem>,
  builder?: Builder,
}

export interface InitialModelOptions {

}

export function initialModel(options: InitialModelOptions): Model {
  let problemIds: ProblemIdentifier[] = [];
  let problems: Record<string, Problem> = {};

  for (let def of problemDefs) {
    problemIds.push({ team: def.team, tag: def.tag });
    problems[problemIdString(def)] = instantiateProblem(def);
  }

  return {
    panel: Panel.Goal,
    problemIds,
    problems
  };
}



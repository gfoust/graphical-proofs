import { instantiateProblem, Problem, ProblemIdentifier, problemIdString } from "./problem";

import problemSet from "../problems";
import { Builder, Context } from "./builder";

export enum Panel {
  Builder = 'builder',
  Goal = 'goal',
  Formulas = 'formulas',
  Rules = 'rules'
}

export interface Model {
  panel: Panel,
  problemIds: ProblemIdentifier[],
  problemDefs: Record<string, Problem>,
  currentProblem?: Problem | 'invalid',
  builder?: Builder,
}

export interface InitialModelOptions {

}

export function initialModel(options: InitialModelOptions): Model {
  let problemIds: ProblemIdentifier[] = [];
  let problemDefs: Record<string, Problem> = {};

  for (let def of problemSet) {
    problemIds.push({ team: def.team, tag: def.tag });
    problemDefs[problemIdString(def)] = instantiateProblem(def);
  }

  return {
    panel: Panel.Goal,
    problemIds,
    problemDefs
  };
}



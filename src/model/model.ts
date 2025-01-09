import { Color } from "./formula";
import { instantiateProblem, Problem, ProblemIdentifier, problemIdString } from "./problem";

import problemDefs from "../problems";

export enum Panel {
  Builder = 'builder',
  Goal = 'goal',
  Formulas = 'formulas',
  Rules = 'rules'
}

export interface Model {
  panel: Panel,
  problemIds: ProblemIdentifier[],
  currentProblemId?: ProblemIdentifier,
  problems: Record<string, Problem>
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
    panel: Panel.Rules,
    problemIds,
    problems
  };
}



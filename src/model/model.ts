import problemSet from "../problems";

import { Problem, ProblemIdentifier, problemIdString } from "./problem";
import { Builder } from "./builder";
import { Palette } from "./palette";


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
  currentProblemId?: string,
  palette?: Palette,
  builder?: Builder,
}


export function initialModel(): Model {
  let problemIds: ProblemIdentifier[] = [];
  let problemDefs: Record<string, Problem> = {};

  for (let def of problemSet) {
    problemIds.push({ team: def.team, tag: def.tag });
    problemDefs[problemIdString(def)] = def;
  }

  return {
    panel: Panel.Goal,
    problemIds,
    problemDefs
  };
}



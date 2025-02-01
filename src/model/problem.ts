import { Builder } from "./builder";
import { clonePattern, cloneRule, Formula, Rule } from "./pattern";


export interface ProblemIdentifier {
  team: number,
  tag: string
}



export interface Problem extends ProblemIdentifier {
  givens: Formula[],
  rules: Rule[],
  goal: Formula
}



export function problemIdString(id: ProblemIdentifier) {
  return id.team + id.tag.toUpperCase();
}

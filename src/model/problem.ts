import { Formula, Rule } from "./pattern";


export interface ProblemIdentifier {
  team: string,
  tag: number
}



export interface Problem extends ProblemIdentifier {
  givens: Formula[],
  rules: Rule[],
  goal: Formula
}



export function problemIdString(id: ProblemIdentifier) {
  return id.team.toUpperCase() + id.tag;
}

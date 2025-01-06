import { Formula, Rule } from "./formula";

export interface ProblemDefinition {
  givens: Formula[],
  rules: Rule[],
  goal: Formula
}

export interface Problem extends ProblemDefinition {
  derived: Formula[],
}


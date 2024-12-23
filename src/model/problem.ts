import { Formula } from "./formula";
import { Rule } from "./rule";

export interface ProblemDefinition {
  givens: Formula[],
  rules: Rule[],
  goal: Formula
}

export interface Problem extends ProblemDefinition {
  derived: Formula[],
}


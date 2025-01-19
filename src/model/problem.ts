import { Builder } from "./builder";
import { clonePattern, cloneRule, Formula, Rule } from "./formula";

export interface ProblemIdentifier {
  team: number,
  tag: string
}

export interface ProblemDefinition extends ProblemIdentifier {
  givens: Formula[],
  rules: Rule[],
  goal: Formula
}

export interface Problem extends ProblemDefinition {
  derived: Formula[],
  builder?: Builder
}

export function instantiateProblem(defn: ProblemDefinition): Problem {
  return {
    team: defn.team,
    tag: defn.tag,
    givens: defn.givens.map(clonePattern as (f:Formula) => Formula),
    rules: defn.rules.map(cloneRule),
    goal: clonePattern(defn.goal),
    derived: []
  }
}

export function problemIdString(id: ProblemIdentifier) {
  return id.team + id.tag.toLowerCase();
}
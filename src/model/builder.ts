import { Maybe } from "../util";
import { clonePattern, cloneRule, Formula, MatchedPattern, Pattern, Rule } from "./formula";
import { Problem } from "./problem";

export type Context = { [key: string]: Formula|undefined };

export interface BuilderPattern {
  matched: boolean,
  pattern: Pattern,
}

export interface BuilderRule {
  name: string,
  premises: MatchedPattern[],
  consequences: MatchedPattern[]
}

// function notMatched(pattern: Pattern): BuilderPattern {
//   return { matched: false, pattern };
// }

// export function builderRule(rule: Rule): BuilderRule {
//   return {
//     name: rule.name,
//     premises: rule.premises.map(notMatched),
//     consequences: rule.premises.map(notMatched)
//   };
// }

export interface Builder {
  rule: BuilderRule,
  context: Context,
}

export function instantiatePattern1(pattern: Pattern, context: Context): Maybe<Formula> {
  if (pattern.type === 'atom') {
    return pattern;
  }
  else if (pattern.type === 'var') {
    return context[pattern.name];
  }
  else {
    let cells = pattern.cells.map(p => instantiatePattern1(p, context));
    if (cells.indexOf(undefined) == -1) {
      return { type: 'grid', cells: cells as Formula[] }
    }
    else {
      return undefined;
    }
  }
}

export type PatternInstantiation = { type: 'formula', value: Formula } | { type: 'pattern', value: Pattern };

export function instantiatePattern(pattern: Pattern, context: Context): PatternInstantiation {
  if (pattern.type === 'atom') {
    return { type: 'formula', value: pattern };
  }
  else if (pattern.type === 'var') {
    let formula = context[pattern.name];
    if (formula) {
      return { type: 'formula', value: formula };
    }
    else {
      return { type: 'pattern', value: pattern };
    }
  }
  else {
    let cells = pattern.cells.map(p => instantiatePattern(p, context));
    if (cells.every(i => i.type === 'formula')) {
      return { type: 'formula', value: { type: 'grid', cells: cells.map(i => i.value) } };
    }
    else {
      return { type: 'pattern', value: { type: 'grid', cells: cells.map(i => i.value)} };
    }
  }
}

export function formulaMatches(pattern: Pattern, formula: Formula, context: Context) {
  if (pattern.type === 'var') {
    const value = context[pattern.name];
    if (value === undefined) {
      context[pattern.name] = formula;
      return true;
    }
    else {
      return formulaMatches(formula, value, context);
    }
  }
  else if (pattern.type === 'atom') {
    if (formula.type === 'atom') {
      return formula.color === pattern.color;
    }
    else {
      return false;
    }
  }
  else {
    if (formula.type === 'grid') {
      for (let i = 0; i < pattern.cells.length; ++i) {
        if (!formulaMatches(pattern.cells[i], formula.cells[i], context)) {
          return false;
        }
      }
      return true;
    }
    else {
      return false;
    }
  }
}


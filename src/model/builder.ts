import { clonePattern, cloneRule, Formula, Pattern, Rule } from "./formula";

export type Context = { [key: string]: Formula|undefined };

export interface Builder {
  rule: Rule;
  context: Context;
}


export function match(pattern: Pattern, formula: Formula, context: Context) {
  if (pattern.type === 'var') {
    const value = context[pattern.name];
    if (value === undefined) {
      context[pattern.name] = formula;
      return true;
    }
    else {
      return match(formula, value, context);
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
        if (!match(pattern.cells[i], formula.cells[i], context)) {
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


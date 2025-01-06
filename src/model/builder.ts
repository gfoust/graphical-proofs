import { clonePattern, Formula, Pattern, Rule } from "./formula";

export type Context = { [key: string]: Formula|undefined };

export class Builder {

  private rule: Rule | undefined;
  private context: Context = {};

  hasRule() {
    return this.rule !== undefined;
  }

  premises() {
    return this.rule?.premises.map(clonePattern);
  }

  consequences() {
    return this.rule?.consequences.map(clonePattern);
  }

  canMatch(i: number, formula: Formula) {
    let pattern = this.rule?.premises[i];
    if (pattern) {
      return match(pattern, formula, { ...this.context });
    }
    return false;
  }

  makeMatch(i: number, formula: Formula) {
    let pattern = this.rule?.premises[i];
    let copy = { ...this.context };
    if (pattern) {
      if (match(pattern, formula, copy)) {
        this.context = copy;
        return true;
      }
    }
    return false;
  }
}


function match(pattern: Pattern, formula: Formula, context: Context) {
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


import { Maybe } from "../util";
import { Formula, Pattern, Rule } from "./pattern";
import { Palette } from "./palette";


export type CheckedPattern =
  Pattern & { status?: 'matched' | 'unmatched' | 'invalid'}

export interface BuilderRule {
  name: string,
  premises: CheckedPattern[],
  consequences: CheckedPattern[]
}


export type Context = { [key: string]: Formula|undefined };

export interface Builder {
  rule: BuilderRule,
  context: Context,
}



export type PatternInstantiation =
  { type: 'formula', value: Formula } | { type: 'pattern', value: Pattern };

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
    let cellsHeight = cells.reduce((h, c) => Math.max(h, c.value.height), 0);

    if (cells.every(i => i.type === 'formula')) {
      return {
        type: 'formula',
        value: { type: 'grid', cells: cells.map(i => i.value), height: cellsHeight + 1 }
      };
    }
    else {
      return {
        type: 'pattern',
        value: { type: 'grid', cells: cells.map(i => i.value), height: cellsHeight + 1 } };
    }
  }
}



export function formulaMatches(pattern: Pattern, context: Context, formula: Formula) {
  if (pattern.type === 'var') {
    const value = context[pattern.name];
    if (value === undefined) {
      context[pattern.name] = formula;
      return true;
    }
    else {
      return formulaMatches(formula, context, value);
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
        if (!formulaMatches(pattern.cells[i], context, formula.cells[i])) {
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



function checkFormula(palette: Palette, context: Context, force: boolean = false) {
  return (pattern: CheckedPattern): CheckedPattern => {
    if (force || pattern.status === undefined) {
      let i = instantiatePattern(pattern, context);

      if (i.value.height > 4) {
        return { ...pattern, status: 'invalid' };
      }

      let matched = palette.givens.some(f => formulaMatches(i.value, {}, f))
        || palette.derived.some(f => formulaMatches(i.value, {}, f));

      if (i.type === 'formula') {
        return { ...pattern, status: matched ? 'matched' : 'unmatched' };
      }
      else {
        return { ...pattern, status: matched ? undefined : 'unmatched' };
      }
    }
    return pattern;
  }
}



export function checkRule(palette: Palette, context: Context, rule: BuilderRule): Rule {
  return {
    name: rule.name,
    premises: rule.premises.map(checkFormula(palette, context)),
    consequences: rule.consequences.map(checkFormula(palette, context, true)),
  }
}
import { Maybe } from "../util";
import { Formula, Pattern, Rule } from "./pattern";
import { Palette } from "./palette";


export type MatchedPattern = { matched?: boolean } & Pattern;

export interface BuilderRule {
  name: string,
  premises: MatchedPattern[],
  consequences: MatchedPattern[]
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



function updateFormulaMatches(palette: Palette, context: Context) {
  const givens = palette.givens.map(id => palette.formulas[id]);
  const derived = palette.derived.map(id => palette.formulas[id]);

  return (pattern: MatchedPattern) => {
    if (pattern.matched === undefined) {
      let i = instantiatePattern(pattern, context);
      let matched = givens.some(f => formulaMatches(i.value, f, {}))
        || derived.some(f => formulaMatches(i.value, f, {}));

      if (i.type === 'formula') {
        return { ...pattern, matched };
      }
      else if (!matched) {
        return { ...pattern, matched };
      }
    }
    return pattern;
  }
}



export function updateRuleMatches(palette: Palette, context: Context, rule: Rule): Rule {
  return {
    name: rule.name,
    premises: rule.premises.map(updateFormulaMatches(palette, context)),
    consequences: rule.consequences.map(updateFormulaMatches(palette, context)),
  }
}
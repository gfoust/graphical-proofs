import { Maybe } from "../util";
import { Action } from "./actions";
import { Builder, formulaMatches, checkRule } from "./builder";
import { Model, Panel } from "./model";
import { addDerived, createPalette, Palette } from "./palette";
import { BaseFormula, Formula } from "./pattern";
import { Problem, problemIdString } from "./problem";


// type Reducer<S, T> = (state: S, action: Action, fullState: T) => S;
//
// type ReducerMap<S> = { [K in keyof S]: Reducer<S[K], S> };
//
// function combineReducers<S>(map: ReducerMap<S>) {
//   return function reducer(state: S, action: Action) {
//     let change = false;
//     const result = {} as S;
//     for (const key in map) {
//       result[key] = map[key](state[key], action, state);
//       if (!Object.is(state[key], result[key])) {
//         change = true;
//       }
//     }
//     if (change) {
//       return result;
//     }
//     else {
//       return state;
//     }
//   };
// }



function scrollPositionsReducer(
  positions: Record<string, number>,
  action: Action
): Record<string, number> {

  if (action.type === 'save-scroll-position') {
    return { ...positions, ...action.positions };
  }

  return positions;
}



function currentProblemIdReducer(
  currentProblemId: Maybe<string>,
  action: Action,
  problemDefs: Record<string, Problem>
): Maybe<string> {

  if (action.type === 'select-problem') {
    if (action.problemId === undefined) {
      return undefined;
    }
    else {
      return action.problemId in problemDefs ? action.problemId : 'invalid';
    }
  }

  return currentProblemId;
}



function paletteReducer(
  palette: Maybe<Palette>,
  action: Action,
  currentProblem: Maybe<Problem>
): Maybe<Palette> {

  if (action.type === 'select-problem') {
    if (currentProblem) {
      if (action.reset) {
        localStorage.removeItem("pf-" + problemIdString(currentProblem));
      }
      else {
        const paletteString = localStorage.getItem("pf-" + problemIdString(currentProblem));
        if (paletteString) {
          try {
            return JSON.parse(paletteString) as Palette;
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
          catch (err) {}
        }
      }

      return createPalette(currentProblem);
    }
    else {
      return undefined;
    }
  }

  else if (action.type === 'add-derived' && currentProblem && palette) {
    const nextPalette = addDerived(action.formula, palette);
    localStorage.setItem("pf-" + problemIdString(currentProblem), JSON.stringify(nextPalette));
    return nextPalette;
  }

  return palette;
}



function selectedFormulaReducer(
  formula: Maybe<Formula>,
  action: Action
): Maybe<Formula> {

  if (action.type === 'select-formula') {
    return action.formula;
  }

  else if (action.type === 'select-problem') {
    return undefined;
  }

  return formula;
}



function builderReducer(
  builder: Maybe<Builder>,
  action: Action,
  palette: Maybe<Palette>
): Maybe<Builder> {

  if (action.type === 'select-problem') {
    return undefined;

  }
  else if (action.type === 'select-rule') {
    if (action.rule) {
      return { rule: action.rule, context: [] };
    }
    else {
      return undefined;
    }
  }

  else if (action.type === 'bind-pattern' && builder && palette) {
    const boundContext = [ ...builder.context ];
    if (formulaMatches(action.pattern, boundContext, action.formula)) {

      return {
        rule: checkRule(palette, boundContext, builder.rule),
        context: boundContext
      }
    }
  }

  else if (action.type === 'add-derived' && builder && palette) {
    const newPalette = addDerived(action.formula, palette);

    return {
      rule: checkRule(newPalette, builder.context, builder.rule),
      context: builder.context
    };
  }

  return builder;
}



function addedFormulaReducer(
  addedFormula: Maybe<BaseFormula>,
  action: Action
): Maybe<BaseFormula> {
  if (action.type === 'add-derived') {
    return action.formula as BaseFormula;
  }

  return undefined;
}



function solvedReducer(
  solved: boolean,
  action: Action,
  currentProblem: Maybe<Problem>,
  palette: Maybe<Palette>
): boolean {
  if (action.type === 'select-problem') {
    if (currentProblem && palette) {
      for (const formula of palette.derived) {
        if (formulaMatches(currentProblem.goal, [], formula)) {
          return true;
        }
      }
    }
    return false;
  }
  else if (action.type === 'add-derived' && currentProblem) {
    if (formulaMatches(currentProblem.goal, [], action.formula)) {
      return true;
    }
  }

  return solved;
}



function panelReducer(panel: Panel, action: Action, solved: boolean): Panel {

  if (action.type === 'show-panel') {
    return action.panel;
  }

  else if (action.type === 'select-rule') {
    return Panel.Builder;
  }

  else if (action.type === 'add-derived' && solved) {
    return Panel.Goal;
  }

  else if (action.type === 'select-formula') {
    return Panel.Builder;
  }

  return panel;
}



export function modelReducer(model: Model, action: Action): Model {

  const problemIds = model.problemIds;

  const problemDefs = model.problemDefs;

  const currentProblemId =
    currentProblemIdReducer(model.currentProblemId, action, model.problemDefs);

  const currentProblem = currentProblemId ? problemDefs[currentProblemId] : undefined;

  const palette = paletteReducer(model.palette, action, currentProblem);

  const builder = builderReducer(model.builder, action, palette);

  const addedFormula = addedFormulaReducer(model.addedFormula, action);

  const selectedFormula = selectedFormulaReducer(model.selectedFormula, action);

  const scrollPositions = scrollPositionsReducer(model.scrollPositions, action);

  const solved = solvedReducer(model.solved, action, currentProblem, palette);

  const panel = panelReducer(model.panel, action, solved);

  return {
    problemIds,
    problemDefs,
    currentProblemId,
    palette,
    selectedFormula,
    builder,
    addedFormula,
    scrollPositions,
    panel,
    solved,
  }
}

// export const modelReducer = combineReducers<Model>({
//   panel: panelReducer,
//   problemIds: ignore,
//   problemDefs: ignore,
//   currentProblemId: currentProblemIdReducer,
//   palette: paletteReducer,
//   builder: builderReducer,
//   addedFormula: addedFormulaReducer,
//   scrollPositions: scrollPositionsReducer,
//   solved: solvedReducer
// });

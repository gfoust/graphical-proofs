import { Maybe } from "../util";
import { Action } from "./actions";
import { Builder, formulaMatches, checkRule } from "./builder";
import { Model, Panel } from "./model";
import { addDerived, createPalette, Palette } from "./palette";
import { BaseFormula } from "./pattern";
import { Problem } from "./problem";


type Reducer<S, T> = (state: S, action: Action, fullState: T) => S;

type ReducerMap<S> = { [K in keyof S]: Reducer<S[K], S> };


function combineReducers<S>(map: ReducerMap<S>) {
  return function reducer(state: S, action: Action) {
    let change = false;
    let result = {} as S;
    for (let key in map) {
      result[key] = map[key](state[key], action, state);
      if (!Object.is(state[key], result[key])) {
        change = true;
      }
    }
    if (change) {
      return result;
    }
    else {
      return state;
    }
  };
}



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
    return currentProblem ? createPalette(currentProblem) : undefined;
  }

  else if (action.type === 'add-derived' && palette) {
    return addDerived(action.formula, palette);
  }

  return palette;
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
      return { rule: action.rule, context: {} };
    }
    else {
      return undefined;
    }
  }

  else if (action.type === 'bind-pattern' && builder && palette) {
    let boundContext = { ...builder.context };
    if (formulaMatches(action.pattern, boundContext, action.formula)) {

      return {
        rule: checkRule(palette, boundContext, builder.rule),
        context: boundContext
      }
    }
  }

  else if (action.type === 'add-derived' && builder && palette) {
    let newPalette = addDerived(action.formula, palette);

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
  currentProblem: Maybe<Problem>
): boolean {
  if (action.type === 'add-derived' && currentProblem) {
    if (formulaMatches(currentProblem.goal, {}, action.formula)) {
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

  const scrollPositions = scrollPositionsReducer(model.scrollPositions, action);

  const solved = solvedReducer(model.solved, action, currentProblem);

  const panel = panelReducer(model.panel, action, solved);

  return {
    problemIds,
    problemDefs,
    currentProblemId,
    palette,
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

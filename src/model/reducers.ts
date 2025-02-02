import { Maybe } from "../util";
import { Action } from "./actions";
import { Builder, formulaMatches, checkRule } from "./builder";
import { Model, Panel } from "./model";
import { addDerived, createPalette, Palette } from "./palette";
import { BaseFormula } from "./pattern";


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



function panelReducer(panel: Panel, action: Action): Panel {

  if (action.type === 'show-panel') {
    return action.panel;
  }

  else if (action.type === 'select-rule') {
    return Panel.Builder;
  }

  return panel;
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
  model: Model
): Maybe<string> {

  if (action.type === 'select-problem') {
    if (action.problemId === undefined) {
      return undefined;
    }
    else {
      return action.problemId in model.problemDefs ? action.problemId : 'invalid';
    }
  }

  return currentProblemId;
}



function paletteReducer(
  palette: Maybe<Palette>,
  action: Action,
  model: Model
): Maybe<Palette> {

  if (action.type === 'select-problem') {
    if (action.problemId) {
      const problem = model.problemDefs[action.problemId];
      return problem ? createPalette(problem) : undefined;
    }
    else {
      return undefined;
    }
  }

  else if (action.type === 'add-derived' && palette) {
    return addDerived(action.formula, palette);
  }

  return palette;
}



function builderReducer(
  builder: Maybe<Builder>,
  action: Action,
  model: Model
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

  else if (action.type === 'bind-pattern' && builder && model.palette) {
    let boundContext = { ...builder.context };
    if (formulaMatches(action.pattern, action.formula, boundContext)) {

      return {
        rule: checkRule(model.palette, boundContext, builder.rule),
        context: boundContext
      }
    }
  }

  else if (action.type === 'add-derived' && builder && model.palette) {
    let palette = addDerived(action.formula, model.palette);

    return { rule: checkRule(palette, builder.context, builder.rule), context: builder.context };
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



function ignore<T>(state: T, action: Action) {
  return state;
}



export const modelReducer = combineReducers<Model>({
  panel: panelReducer,
  problemIds: ignore,
  problemDefs: ignore,
  currentProblemId: currentProblemIdReducer,
  palette: paletteReducer,
  builder: builderReducer,
  addedFormula: addedFormulaReducer,
  scrollPositions: scrollPositionsReducer,
});

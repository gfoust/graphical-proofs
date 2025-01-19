import { Maybe } from "../util";
import { Action } from "./actions";
import { Builder } from "./builder";
import { Model, Panel } from "./model";
import { Problem } from "./problem";


type Reducer<T> = (state: T, action: Action) => T;

type ReducerMap<S> = { [K in keyof S]: Reducer<S[K]> };

function combineReducers<S>(map: ReducerMap<S>): Reducer<S> {
  return function reducer(state: S, action: Action) {
    let change = false;
    let result = {} as S;
    for (let key in map) {
      result[key] = map[key](state[key], action);
      if (! Object.is(state[key], result[key])) {
        change = true;
      }
    }
    if (change) {
      return result;
    }
    else {
      return state;
    }
  }
}

function panelReducer(panel: Panel, action: Action) {
  if (action.type === 'show-panel') {
    return action.panel;
  }
  else if (action.type === 'select-rule') {
    return Panel.Builder;
  }
  else {
    return panel;
  }
}

function builderReducer(builder: Maybe<Builder>, action: Action): Maybe<Builder> {
  if (action.type === 'select-rule') {
    return { rule: action.rule, context: {} }
  }
  else {
    return builder;
  }
}

function ignore<T>(state: T, action: Action) {
  return state;
}

export const modelReducer = combineReducers<Model>({
  panel: panelReducer,
  problems: ignore,
  problemIds: ignore,
  builder: builderReducer,
});

import RuleView from "../ui/components/rule-view";
import { Maybe } from "../util";
import { Action } from "./actions";
import { Builder, Context, formulaMatches, instantiatePattern } from "./builder";
import { MatchedPattern, Pattern } from "./formula";
import { Model, Panel } from "./model";
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


function panelReducer(panel: Panel, action: Action) {
  if (action.type === 'show-panel') {
    return action.panel;
  }
  else if (action.type === 'select-rule') {
    return Panel.Builder;
  }

  return panel;
}


function currentProblemReducer(currentProblem: Maybe<Problem | 'invalid'>, action: Action, model: Model): Maybe<Problem | 'invalid'> {
  if (action.type === 'select-problem') {
    if (action.problemId) {
      return model.problemDefs[action.problemId.toLowerCase()] || 'invalid';
    }
    else {
      return undefined;
    }
  }

  return currentProblem;
}


function checkPattern(currentProblem: Problem, bindContext: Context) {
  return (pattern: MatchedPattern) => {
    if (pattern.matched === undefined) {
      let i = instantiatePattern(pattern, bindContext);
      let matched = currentProblem.givens.some(f => formulaMatches(i.value, f, {}))
        || currentProblem.derived.some(f => formulaMatches(i.value, f, {}));

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


function builderReducer(builder: Maybe<Builder>, action: Action, model: Model): Maybe<Builder> {
  if (action.type === 'select-rule') {
    if (action.rule) {
      return { rule: action.rule, context: {} };
    }
    else {
      return undefined;
    }
  }

  else if (builder && action.type === 'bind-pattern') {
    if (model.currentProblem && model.currentProblem !== 'invalid') {
      let bindContext = { ...builder.context };
      if (formulaMatches(action.pattern, action.formula, bindContext)) {

        let rule = {
          name: builder.rule.name,
          premises: builder.rule.premises.map(checkPattern(model.currentProblem, bindContext)),
          consequences: builder.rule.consequences.map(checkPattern(model.currentProblem, bindContext)),
        };

        return { rule, context: bindContext };
      }
    }
  }

  else if (action.type === 'select-problem') {
    return undefined;
  }

  return builder;
}


function ignore<T>(state: T, action: Action) {
  return state;
}


export const modelReducer = combineReducers<Model>({
  panel: panelReducer,
  problemIds: ignore,
  problemDefs: ignore,
  currentProblem: currentProblemReducer,
  builder: builderReducer,
});

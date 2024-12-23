import React, { useReducer } from 'react';

import './page.scss';
import App from '../app';
import { initialModel, Panel } from '../model/model';
import { modelReducer } from '../model/reducers';
import { NavBar } from './navbar';
import { BuilderPanel } from './panels/builder';
import { DerivationPanel } from './panels/derivation';
import { GoalPanel } from './panels/goal';
import { PatternsPanel } from './panels/patterns';
import { RulesPanel } from './panels/rules';

const panelComponent = {
  [Panel.Builder]: BuilderPanel,
  [Panel.Derivation]: DerivationPanel,
  [Panel.Goal]: GoalPanel,
  [Panel.Patterns]: PatternsPanel,
  [Panel.Rules]: RulesPanel,
}

export default function Page() {
  const [model, dispatch] = useReducer(modelReducer, initialModel({}));
  App.dispatch = dispatch;

  const Panel = panelComponent[model.panel]

  return (<>
    <h1 className="page">Problem 4B</h1>
    <NavBar panel={model.panel}/>
    <Panel/>
  </>)
}

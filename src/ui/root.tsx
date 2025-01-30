import { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { modelReducer } from '../model/reducers';
import { initialModel } from '../model/model';
import App from '../app';

import Page from "./page";
import "./root.scss";

export default function Root() {
  const [model, dispatch] = useReducer(modelReducer, initialModel({}));
  App.dispatch = dispatch;

  return (
    <App.PanelContext value={model.panel}>
      <App.ProblemListContext value={model.problemIds}>
        <App.ProblemDefinitionsContext value={model.problemDefs}>
          <App.CurrentProblemContext value={model.currentProblem}>
            <App.BuilderContext value={model.builder}>
              <BrowserRouter basename="/proofs/">
                <Page/>
              </BrowserRouter>
            </App.BuilderContext>
          </App.CurrentProblemContext>
        </App.ProblemDefinitionsContext>
      </App.ProblemListContext>
    </App.PanelContext>
  );
}

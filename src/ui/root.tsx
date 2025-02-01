import { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { modelReducer } from '../model/reducers';
import { initialModel } from '../model/model';
import App from '../app';

import Page from "./page";
import "./root.scss";

export default function Root() {
  const [model, dispatch] = useReducer(modelReducer, initialModel());
  App.dispatch = dispatch;

  return (
    <App.PanelContext value={model.panel}>
      <App.ProblemIdsContext value={model.problemIds}>
        <App.ProblemDefsContext value={model.problemDefs}>
          <App.CurrentProblemIdContext value={model.currentProblemId}>
            <App.PaletteContext value={model.palette}>
              <App.BuilderContext value={model.builder}>
                <BrowserRouter basename="/proofs/">
                  <Page/>
                </BrowserRouter>
              </App.BuilderContext>
            </App.PaletteContext>
          </App.CurrentProblemIdContext>
        </App.ProblemDefsContext>
      </App.ProblemIdsContext>
    </App.PanelContext>
  );
}

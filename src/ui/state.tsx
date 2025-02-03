import { PropsWithChildren, useReducer } from "react";

import App from "../app";
import { modelReducer } from "../model/reducers";
import { initialModel } from "../model/model";


export default function ViewState({ children }: PropsWithChildren<{}>) {
  const [model, dispatch] = useReducer(modelReducer, initialModel());
  App.dispatch = dispatch;

  return (
    <App.PanelContext value={model.panel}>
      <App.ProblemIdsContext value={model.problemIds}>
        <App.ProblemDefsContext value={model.problemDefs}>
          <App.ScrollPositionsContext value={model.scrollPositions}>
            <App.CurrentProblemIdContext value={model.currentProblemId}>
              <App.PaletteContext value={model.palette}>
                <App.BuilderContext value={model.builder}>
                  <App.AddedFormulaContext value={model.addedFormula}>
                    <App.SolvedContext value={model.solved}>
                    { children }
                    </App.SolvedContext>
                  </App.AddedFormulaContext>
                </App.BuilderContext>
              </App.PaletteContext>
            </App.CurrentProblemIdContext>
          </App.ScrollPositionsContext>
        </App.ProblemDefsContext>
      </App.ProblemIdsContext>
    </App.PanelContext>
  );


}
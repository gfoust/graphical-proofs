import { createContext } from "react";

import { Action } from "./model/actions";
import { Panel } from "./model/model";
import { Problem, ProblemIdentifier } from "./model/problem";
import { Maybe } from "./util";
import { Builder } from "./model/builder";
import { Palette } from "./model/palette";
import { BaseFormula, Formula } from "./model/pattern";

export const App = {
  dispatch: (() => {}) as (action: Action) => void,
  PanelContext: createContext<Panel>(null as never),
  ProblemIdsContext: createContext<ProblemIdentifier[]>(null as never),
  ProblemDefsContext: createContext<Record<string, Problem>>(null as never),
  ScrollPositionsContext: createContext<Record<string, number>>({}),
  CurrentProblemIdContext: createContext<Maybe<string>>(undefined),
  PaletteContext: createContext<Maybe<Palette>>(undefined),
  SelectedFormulaContext: createContext<Maybe<Formula>>(undefined),
  BuilderContext: createContext<Maybe<Builder>>(undefined),
  AddedFormulaContext: createContext<Maybe<BaseFormula>>(undefined),
  SolvedContext: createContext<boolean>(false),
};

export default App;

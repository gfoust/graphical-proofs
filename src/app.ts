import { createContext } from "react";

import { Action } from "./model/actions";
import { Panel } from "./model/model";
import { Problem, ProblemIdentifier } from "./model/problem";
import { Maybe } from "./util";
import { Builder } from "./model/builder";
import { Palette } from "./model/palette";

export const App = {
  dispatch: (action: Action) => {},
  PanelContext: createContext<Panel>(null as any),
  ProblemIdsContext: createContext<ProblemIdentifier[]>(null as any),
  ProblemDefsContext: createContext<Record<string, Problem>>(null as any),
  CurrentProblemIdContext: createContext<Maybe<string>>(undefined),
  PaletteContext: createContext<Maybe<Palette>>(undefined),
  BuilderContext: createContext<Maybe<Builder>>(undefined),
};

export default App;

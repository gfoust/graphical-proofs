import { createContext } from "react";

import { Action } from "./model/actions";
import { Panel } from "./model/model";
import { Problem, ProblemIdentifier } from "./model/problem";
import { Maybe } from "./util";
import { Builder } from "./model/builder";

export const App = {
  dispatch: (action: Action) => {},
  ProblemListContext: createContext<ProblemIdentifier[]>(null as any),
  ProblemsContext: createContext<Record<string, Problem>>(null as any),
  PanelContext: createContext<Panel>(null as any),
  BuilderContext: createContext<Maybe<Builder>>(undefined),
};

export default App;

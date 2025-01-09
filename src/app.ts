import { createContext } from "react";

import { Action } from "./model/actions";
import { Panel } from "./model/model";
import { Problem, ProblemIdentifier } from "./model/problem";

export const App = {
  dispatch: (action: Action) => {},
  ProblemListContext: createContext<ProblemIdentifier[]>(null as any),
  ProblemsContext: createContext<Record<string, Problem>>(null as any),
  PanelContext: createContext<Panel>(null as any),
};

export default App;

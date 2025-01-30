import { useContext, useEffect } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router";

import App from "../app";
import { Panel } from "../model/model";
import { Problem, problemIdString } from "../model/problem";

import NavBar from "./navbar";
import ProblemList from "./problem-list";
import BuilderPanel from "./panels/builder";
import GoalPanel from "./panels/goal";
import FormulasPanel from "./panels/formulas";
import RulesPanel from "./panels/rules";

import "./page.scss";
import { Actions } from "../model/actions";

function UnknownPath() {
  return (
    <>
      <h1>Problem Not Found</h1>
      <p>
        This is not a valid problem address.
      </p>
      [ <Link to="/">Home</Link> ]
    </>
  )
}


function Display({ panel, problem }: { panel: Panel, problem: Problem }) {
  switch (panel) {
    case Panel.Builder:  return <BuilderPanel givens={problem.givens} derived={problem.derived}/>;
    case Panel.Goal:     return <GoalPanel goal={problem.goal}/>
    case Panel.Formulas: return <FormulasPanel givens={problem.givens} derived={problem.derived}/>
    case Panel.Rules:    return <RulesPanel rules={problem.rules}/>
    default:             return <h1>Error</h1>
  }
}


function ProblemPage() {
  const problem = useContext(App.CurrentProblemContext);
  const panel = useContext(App.PanelContext);
  const { problemId } = useParams();

  useEffect(() => {
    App.dispatch(Actions.selectProblem(problemId));
  }, [problemId])

  if (!problem || problem == 'invalid') {
    return <UnknownPath/>
  }
  else {
    return (
      <>
        <h1 className="page">Problem {problemIdString(problem).toUpperCase()}</h1>
        <NavBar panel={panel}/>
        <pf-problem>
          <Display panel={panel} problem={problem}/>
        </pf-problem>
      </>
    );
  }
}


export default function Page() {
  return (
    <pf-page>
      <Routes>
        <Route path="" element={<ProblemList/>}/>
        <Route path=":problemId" element={<ProblemPage/>}/>
        <Route path="*" element={<UnknownPath/>}/>
      </Routes>
    </pf-page>
  );
}

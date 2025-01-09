import { useContext } from "react";
import { Link, Route, Routes, useParams } from "react-router";

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

function useProblem() {
  let { problemId } = useParams();
  console.log('problemId', problemId)
  const problems = useContext(App.ProblemsContext);
  console.log('problems', problems);
  if (problemId) {
    problemId = problemId.toLowerCase();
    if (problemId in problems) {
      return problems[problemId];
    }
  }
  return undefined;
}


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
    case Panel.Builder:  return <BuilderPanel/>;
    case Panel.Goal:     return <GoalPanel goal={problem.goal}/>
    case Panel.Formulas: return <FormulasPanel givens={problem.givens} derived={problem.derived}/>
    case Panel.Rules:    return <RulesPanel rules={problem.rules}/>
    default:             return <h1>Error</h1>
  }
}


function ProblemPage() {
  const problem = useProblem();
  const panel = useContext(App.PanelContext);

  if (!problem) {
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

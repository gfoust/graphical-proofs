import React, { useContext, useEffect } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router";

import App from "../app";
import { Actions } from "../model/actions";
import { Panel } from "../model/model";
import { Problem, problemIdString } from "../model/problem";

import { BackIcon, RefreshIcon } from "./components/icons";
import NavBar from "./components/navbar";
import { WarningDialog } from "./components/warning-dialog";
import ProblemList from "./problem-list";
import BuilderPanel from "./panels/builder";
import GoalPanel from "./panels/goal";
import FormulasPanel from "./panels/formulas";
import RulesPanel from "./panels/rules";
import PickerSplit from "./panels/picker-split";

import "./page.scss";

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
    case Panel.Goal:
      return <GoalPanel goal={problem.goal}/>
    case Panel.Formulas:
      return <FormulasPanel/>
    case Panel.Rules:
      return (
        <PickerSplit selectable={false}>
          <RulesPanel rules={problem.rules}/>
        </PickerSplit>
      );
    case Panel.Builder:
      return (
        <PickerSplit selectable={true}>
          <BuilderPanel/>
        </PickerSplit>
      );
    default:
      return <h1>Error</h1>
  }
}

function ProblemPage() {
  const { problemId } = useParams();
  useEffect(() => {
    App.dispatch(Actions.selectProblem(problemId));
  }, [problemId])

  const currentProblemId = useContext(App.CurrentProblemIdContext);
  const problemDefs = useContext(App.ProblemDefsContext);
  const panel = useContext(App.PanelContext);

  const navigate = useNavigate();

  if (!currentProblemId || currentProblemId == 'invalid') {
    return <UnknownPath/>
  }
  else {
    const problem = problemDefs[currentProblemId];

    return (
      <>
        <WarningDialog
          title="Reset Problem"
          acceptLabel="Reset"
          cancelLabel="Cancel"
          onAccept={() => App.dispatch(Actions.selectProblem(currentProblemId, true))}
        >
          Start this problem over from the beginning?
        </WarningDialog>
        <pf-nav-button-bar>
          <button className="btn btn-secondary" onClick={() => navigate("/")}><BackIcon/></button>
          <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#warning-dialog"><RefreshIcon/></button>
        </pf-nav-button-bar>
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

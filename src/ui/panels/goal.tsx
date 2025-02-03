import { useContext } from "react";

import App from "../../app";
import { Formula } from "../../model/pattern";
import { FormulaBlock } from "../components/pattern-view";

import './goal.scss';

export interface GoalPanelProps {
  goal: Formula;
}

export default function GoalPanel({ goal }: GoalPanelProps) {
  const solved = useContext(App.SolvedContext);
  return (
    <>
      {
        solved
          ? <h3 className="solved">Solved</h3>
          : <h3 className="unsolved">Unsolved</h3>
      }
      <pf-goal-panel>
        <FormulaBlock id="goal" formula={goal}/>
      </pf-goal-panel>
    </>
  )
}

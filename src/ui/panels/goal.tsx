import { Formula } from "../../model/pattern";
import { FormulaBlock } from "../components/pattern-view";

import './goal.scss';

export interface GoalPanelProps {
  goal: Formula;
}

export default function GoalPanel({ goal }: GoalPanelProps) {
  return (
    <>
      <h2>Goal</h2>
      <pf-goal-panel>
        <FormulaBlock formula={goal}/>
      </pf-goal-panel>
    </>
  )
}

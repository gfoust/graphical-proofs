import { Formula } from "../../model/formula";
import { PatternView } from "../pattern-view";

export interface GoalPanelProps {
  goal: Formula;
}

export default function GoalPanel({ goal }: GoalPanelProps) {
  return (
    <>
      <h2>Goal</h2>
      <center>
        <PatternView pattern={goal}/>
      </center>
    </>
  )
}

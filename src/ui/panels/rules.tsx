import { Context } from "../../model/builder";
import { Color, Pattern, Var } from "../../model/formula"
import { PatternView } from "../pattern-view";

export default function RulesPanel() {
  const rule: Pattern = { type: 'grid', cells: [
    { type: 'atom', color: Color.Blue },
    { type: 'var', name: Var.A },
    { type: 'atom', color: Color.Red },
    { type: 'var', name: Var.B },
    { type: 'atom', color: Color.Gray },
    { type: 'var', name: Var.C },
    { type: 'atom', color: Color.Orange },
    { type: 'var', name: Var.D },
    { type: 'grid', cells: [
      { type: 'atom', color: Color.Blue },
      { type: 'var', name: Var.A },
      { type: 'atom', color: Color.Red },
      { type: 'var', name: Var.B },
      { type: 'atom', color: Color.Gray },
      { type: 'var', name: Var.C },
      { type: 'atom', color: Color.Orange },
      { type: 'var', name: Var.D },
      { type: 'atom', color: Color.Yellow },
    ] },
  ] };

  const context: Context = {
    [Var.C]: { type: 'atom', color: Color.Purple },
    [Var.A]: { type: 'grid', cells: [
      { type: 'atom', color: Color.Yellow },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Purple },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Cyan },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Blue },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Red },
    ]}
  };

  return (
    <div>
      <h1>Rules</h1>
      <div>
        <PatternView pattern={{ type: 'var', name: Var.A }} context={context}/>
        <br/><br/>
        <PatternView pattern={rule} context={context}/>
      </div>
    </div>
  )
}
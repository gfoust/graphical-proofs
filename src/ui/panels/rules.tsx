import { Context } from "../../model/builder";
import { Color, Pattern, VarName } from "../../model/formula"
import { PatternView } from "../pattern-view";

export function RulesPanel() {
  const rule: Pattern = { type: 'grid', cells: [
    { type: 'atom', color: Color.Blue },
    { type: 'var', name: VarName.A },
    { type: 'atom', color: Color.Red },
    { type: 'var', name: VarName.B },
    { type: 'atom', color: Color.Gray },
    { type: 'var', name: VarName.C },
    { type: 'atom', color: Color.Orange },
    { type: 'var', name: VarName.D },
    { type: 'grid', cells: [
      { type: 'atom', color: Color.Blue },
      { type: 'var', name: VarName.A },
      { type: 'atom', color: Color.Red },
      { type: 'var', name: VarName.B },
      { type: 'atom', color: Color.Gray },
      { type: 'var', name: VarName.C },
      { type: 'atom', color: Color.Orange },
      { type: 'var', name: VarName.D },
      { type: 'atom', color: Color.Yellow },
    ] },
  ] };

  const context: Context = {
    [VarName.C]: { type: 'atom', color: Color.Purple },
    [VarName.A]: { type: 'grid', cells: [
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
        <PatternView pattern={{ type: 'var', name: VarName.A }} context={context}/>
        <br/><br/>
        <PatternView pattern={rule} context={context}/>
      </div>
    </div>
  )
}
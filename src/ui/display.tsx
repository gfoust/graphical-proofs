import { Color, Formula } from "../model/formula";
import { Panel } from "../model/model";

import { BuilderPanel } from "./panels/builder";
import { DerivationPanel } from "./panels/derivation";
import { GoalPanel } from "./panels/goal";
import { PatternsPanel } from "./panels/patterns";
import { RulesPanel } from "./panels/rules";

import './display.scss';

const formulas: Formula[] = [
  { type: 'atom', color: Color.Blue },
  { type: 'grid',
    cells: [
      { type: 'atom', color: Color.Cyan },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Blue },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Gray },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Purple },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Yellow },
    ]
  },
  { type: 'atom', color: Color.Red },
  { type: 'atom', color: Color.Green },
  { type: 'grid',
    cells: [
      { type: 'grid',
        cells: [
          { type: 'atom', color: Color.Red },
          { type: 'atom', color: Color.White },
          { type: 'atom', color: Color.Green },
          { type: 'atom', color: Color.White },
          { type: 'atom', color: Color.Gray },
          { type: 'atom', color: Color.White },
          { type: 'atom', color: Color.Orange },
          { type: 'atom', color: Color.White },
          { type: 'grid',
            cells: [
              { type: 'atom', color: Color.White },
              { type: 'atom', color: Color.Cyan },
              { type: 'atom', color: Color.White },
              { type: 'atom', color: Color.Blue },
              { type: 'atom', color: Color.Gray },
              { type: 'atom', color: Color.Purple },
              { type: 'atom', color: Color.White },
              { type: 'atom', color: Color.Yellow },
              { type: 'atom', color: Color.White },
            ]
          },
        ]
      },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Blue },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Gray },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Purple },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Yellow },
    ]
  },
  { type: 'grid',
    cells: [
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Red },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Blue },
      { type: 'atom', color: Color.Gray },
      { type: 'atom', color: Color.Green },
      { type: 'atom', color: Color.White },
      { type: 'atom', color: Color.Yellow },
      { type: 'atom', color: Color.White },
    ]
  },
];


export interface DisplayProps {
  panel: Panel
}

const panelComponent = {
  [Panel.Builder]: BuilderPanel,
  [Panel.Derivation]: DerivationPanel,
  [Panel.Goal]: GoalPanel,
  [Panel.Patterns]: PatternsPanel,
  [Panel.Rules]: RulesPanel,
}

export default function Display({ panel }: DisplayProps) {
  const Panel = panelComponent[panel]

  return (
    <proof-display>
      <Panel formulas={formulas}/>
    </proof-display>
  )
}

import * as React from "react";
import { JSX } from "react";
import { Pattern } from "../model/formula";

import "./pattern-view.scss";
import { Context } from "../model/builder";

interface PatternElementProps extends React.PropsWithChildren {
  pattern: Pattern;
  context: Context;
  depth: number;
}

function PatternElement({ pattern, context, depth, children }: PatternElementProps) {
  let element: JSX.Element;
  if (pattern.type === 'atom') {
    element =
      <pf-pattern-atom className={`${pattern.color} d${depth}`}>
        { children }
      </pf-pattern-atom>
  }
  else if (pattern.type === 'var') {
    const value = context[pattern.name];
    if (value) {
      element =
        <PatternElement pattern={value} context={context} depth={depth}>
          <pf-pattern-var className={`assigned d${depth}`}>
            { pattern.name }
          </pf-pattern-var>
        </PatternElement>;
    }
    else {
      element =
        <pf-pattern-atom className={`empty d${depth}`}>
          <pf-pattern-var className={`d${depth}`}>
            { pattern.name }
          </pf-pattern-var>
        </pf-pattern-atom>
    }
  }
  else {
    element =
      <pf-pattern-grid className={`d${depth}`}>
      { children }
      { pattern.cells.map((p, i) =>
          <PatternElement pattern={p} key={i} context={context} depth={depth + 1}/>
        )
      }
      </pf-pattern-grid>;
  }
  return element;
}

export interface PatternViewProps {
  pattern: Pattern;
  context?: Context;
}

export function PatternView({ pattern, context }: PatternViewProps) {
  return (
    <pf-pattern-view>
      <PatternElement pattern={pattern} context={context || {}} depth={0}/>
    </pf-pattern-view>
  );
}


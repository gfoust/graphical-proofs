import React, { JSX } from "react";

import { CheckedPattern, Context, formulaMatches } from "../../model/builder";
import { Formula, Pattern, Var, varName } from "../../model/pattern";
import { className, Maybe, range } from "../../util";

import "./pattern-view.scss";


interface PatternElementProps extends React.PropsWithChildren {
  pattern: Pattern;
  context: Context;
  divisions: number;
  highlight?: Var;
  onMouseOverVariable?: (v: Var) => void;
  onMouseOutVariable?: () => void;
}


function PatternElement({
  pattern,
  context,
  divisions,
  highlight,
  onMouseOverVariable,
  onMouseOutVariable,
  children
}: PatternElementProps) {

  let element: JSX.Element;
  if (pattern.type === 'atom') {
    element =
      <pf-pattern-atom className={`${pattern.color} d${divisions}`}>
        { children }
      </pf-pattern-atom>
  }
  else if (pattern.type === 'var') {
    const value = context[pattern.name];
    if (value) {
      element =
        <PatternElement pattern={value} context={context} divisions={divisions}>
          <pf-pattern-var className={`assigned d1`}>
            { varName(pattern.name) }
          </pf-pattern-var>
        </PatternElement>;
    }
    else {
      let hl: string;
      if (highlight !== undefined && highlight === pattern.name) {
        hl = "highlight";
      }
      else {
        hl = "empty";
      }
      element =
        <pf-pattern-atom
          className={`${hl} ${varName(pattern.name)} d${divisions}`}
          onMouseOver={onMouseOverVariable && (() => onMouseOverVariable(pattern.name))}
          onMouseOut={onMouseOutVariable}
        >
          <pf-pattern-var className={`d1`}>
            { varName(pattern.name) }
          </pf-pattern-var>
        </pf-pattern-atom>
    }
  }
  else { // pattern.type === 'grid'
    let d: number;
    if (pattern.cells.length >= 9) {
      d = 3;
    }
    else if (pattern.cells.length >= 4) {
      d = 2;
    }
    else {
      d = 1;
      console.log('d1', pattern);
    }
    const nested = range(0, d*d, pattern.cells).map((p, i) =>
      <PatternElement
        pattern={p}
        key={i}
        context={context}
        divisions={d}
        highlight={highlight}
        onMouseOverVariable={onMouseOverVariable}
        onMouseOutVariable={onMouseOutVariable}
      />
    )
  element =
      <pf-pattern-grid className={`d${divisions}`}>
      { children }
      { nested }
      </pf-pattern-grid>;
  }
  return element;
}



export interface PatternBlockProps {
  pattern: CheckedPattern;
  context?: Context;
  highlight?: Var;
  candidate?: Formula;
  onMouseOverVariable?: (v: Var) => void;
  onMouseOutVariable?: () => void;
  onBind?: (pattern: Pattern, formula: Formula) => void;
}


export function PatternBlock({
  pattern,
  context,
  highlight,
  candidate,
  onMouseOverVariable,
  onMouseOutVariable,
  onBind
}: PatternBlockProps) {
  let className: Maybe<string>;
  let clickHandler: Maybe<() => void>;

  console.log('pattern', pattern);

  if (pattern.status) {
    className = pattern.status;
  }
  else if (candidate) {
    const matchContext = context ? [ ...context ] : [];
    if (formulaMatches(pattern, matchContext, candidate)) {
      className = "allowed";
      if (onBind) {
        clickHandler = () => onBind(pattern, candidate);
      }
    }
    else {
      className = "restricted";
    }
  }

  const patternProps = {pattern, context: context || [], highlight, onMouseOverVariable, onMouseOutVariable};

  return (
    <pf-pattern-block className={className} onClick={clickHandler}>
      <pf-pattern-view>
        <PatternElement {...patternProps} divisions={1}/>
      </pf-pattern-view>
    </pf-pattern-block>
  );
}



export interface FormulaBlockProps {
  formula: Formula;
  id: string;
  selected?: boolean;
  added?: boolean;
  onSelect?: (formula: Maybe<Formula>) => void;
}


export function FormulaBlock({
  formula,
  id,
  selected,
  added,
  onSelect
}: FormulaBlockProps) {

  function clickHandler() {
    if (onSelect) {
      if (selected) {
        onSelect(undefined);
      }
      else {
        onSelect(formula);
      }
    }
  }

  return (
    <pf-formula-block
      id={id}
      className={className({ selected, added })}
      onClick={clickHandler}
      draggable={true}
    >
      <pf-pattern-view>
        <PatternElement pattern={formula} context={[]} divisions={1}/>
      </pf-pattern-view>
    </pf-formula-block>
  );
}

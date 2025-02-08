import React, { MouseEventHandler } from "react";

import "./button-bar.scss";

export interface ButtonBarProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function ButtonBar({ text, onClick }: ButtonBarProps) {
  return (
    <pf-button-bar>
      <button className="btn btn-primary" onClick={onClick}>{text}</button>
    </pf-button-bar>
  )
}

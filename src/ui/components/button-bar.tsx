import React, { MouseEventHandler, PropsWithChildren } from "react";

import "./button-bar.scss";

export interface ButtonBarProps extends PropsWithChildren {
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function ButtonBar({ disabled, onClick, children }: ButtonBarProps) {
  return (
    <pf-button-bar>
      <button className="btn btn-primary" disabled={disabled} onClick={onClick}>{children}</button>
    </pf-button-bar>
  )
}

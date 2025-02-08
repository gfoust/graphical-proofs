import React, { PropsWithChildren } from "react";

import FormulaPicker from "../components/formula-picker";

import "./picker-split.scss";

export interface PickerSplitProps extends PropsWithChildren {
  selectable: boolean;
}

export default function PickerSplit({ selectable, children } : PickerSplitProps) {
  return (
    <pf-picker-split>
      <FormulaPicker selectable={selectable}/>
      { children }
    </pf-picker-split>
  );
}
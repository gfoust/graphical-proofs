import React, { MouseEvent } from "react";
import App from "../../app";
import { Panel } from "../../model/model";

import "./navbar.scss";
import { Actions } from "../../model/actions";

export interface NavBarProps {
  panel: Panel;
}

const panelTitles = {
  [Panel.Builder]: "Builder",
  [Panel.Goal]: "Goal",
  [Panel.Formulas]: "Formulas",
  [Panel.Rules]: "Rules",
}

const panelSelectors = {
  [Panel.Builder]:  (event: MouseEvent) => { event.preventDefault(); App.dispatch(Actions.showPanel(Panel.Builder))  },
  [Panel.Goal]:     (event: MouseEvent) => { event.preventDefault(); App.dispatch(Actions.showPanel(Panel.Goal))     },
  [Panel.Formulas]: (event: MouseEvent) => { event.preventDefault(); App.dispatch(Actions.showPanel(Panel.Formulas)) },
  [Panel.Rules]:    (event: MouseEvent) => { event.preventDefault(); App.dispatch(Actions.showPanel(Panel.Rules))    },
}

export default function NavBar({ panel }: NavBarProps) {
  function makeTab(p: Panel) {
    const className = p === panel ? 'nav-link active' : 'nav-link';
    return <a className={className} key={p} onClick={panelSelectors[p]} href="#">{panelTitles[p]}</a>
  }

  return (
    <nav className="nav nav-tabs">
    {
      [Panel.Goal, Panel.Formulas, Panel.Rules, Panel.Builder].map(makeTab)
    }
    </nav>
  )
}
import { MouseEvent } from "react";
import { NavLink, useLocation, useParams } from "react-router";
import App from "../app";
import { Panel } from "../model/model";

import "./navbar.scss";

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
  [Panel.Builder]:  (event: MouseEvent) => { event.preventDefault(); App.dispatch({ type: 'show-panel', panel: Panel.Builder })  },
  [Panel.Goal]:     (event: MouseEvent) => { event.preventDefault(); App.dispatch({ type: 'show-panel', panel: Panel.Goal })     },
  [Panel.Formulas]: (event: MouseEvent) => { event.preventDefault(); App.dispatch({ type: 'show-panel', panel: Panel.Formulas }) },
  [Panel.Rules]:    (event: MouseEvent) => { event.preventDefault(); App.dispatch({ type: 'show-panel', panel: Panel.Rules })    },
}

export default function NavBar({ panel }: NavBarProps) {
  function makeTab(p: Panel) {
    let className = p === panel ? 'nav-link active' : 'nav-link';
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
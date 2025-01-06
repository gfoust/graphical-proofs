import App from "../app";
import { Panel } from "../model/model";

import "./navbar.scss";

export interface NavBarProps {
  panel: Panel;
}

const panelTitle = {
  [Panel.Builder]: "Builder",
  [Panel.Goal]: "Goal",
  [Panel.Formulas]: "Formulas",
  [Panel.Rules]: "Rules",
}

const panelSelector = {
  [Panel.Builder]: () => App.dispatch({ type: 'show-panel', panel: Panel.Builder }),
  [Panel.Goal]: () => App.dispatch({ type: 'show-panel', panel: Panel.Goal }),
  [Panel.Formulas]: () => App.dispatch({ type: 'show-panel', panel: Panel.Formulas }),
  [Panel.Rules]: () => App.dispatch({ type: 'show-panel', panel: Panel.Rules }),
}

export function NavBar({ panel }: NavBarProps) {
  function makePanel(p: Panel) {
    let className = p === panel ? 'nav-link active' : 'nav-link';
    return <a className={className} key={p} onClick={panelSelector[p]} href="#">{panelTitle[p]}</a>
  }

  return (
    <nav className="nav nav-tabs">
    {
      [Panel.Goal, Panel.Formulas, Panel.Rules, Panel.Builder].map(makePanel)
    }
    </nav>
  )
}
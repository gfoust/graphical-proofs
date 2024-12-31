import App from "../app";
import { Panel } from "../model/model";

import "./navbar.scss";

export interface NavBarProps {
  panel: Panel;
}

const panelTitle = {
  [Panel.Builder]: "Builder",
  [Panel.Derivation]: "Derivation",
  [Panel.Goal]: "Goal",
  [Panel.Patterns]: "Patterns",
  [Panel.Rules]: "Rules",
}

const panelSelector = {
  [Panel.Builder]: () => App.dispatch({ type: 'show-panel', panel: Panel.Builder }),
  [Panel.Derivation]: () => App.dispatch({ type: 'show-panel', panel: Panel.Derivation }),
  [Panel.Goal]: () => App.dispatch({ type: 'show-panel', panel: Panel.Goal }),
  [Panel.Patterns]: () => App.dispatch({ type: 'show-panel', panel: Panel.Patterns }),
  [Panel.Rules]: () => App.dispatch({ type: 'show-panel', panel: Panel.Rules }),
}

export function NavBar({ panel }: NavBarProps) {
  function makePanel(p: Panel) {
    let className = p === panel ? 'nav-link active' : 'nav-link';
    return <a className={className} onClick={panelSelector[p]} href="#">{panelTitle[p]}</a>
  }

  return (
    <nav className="nav nav-tabs">
    {
      [Panel.Patterns, Panel.Rules, Panel.Builder, Panel.Derivation, Panel.Goal].map(makePanel)
    }
    </nav>
  )
}
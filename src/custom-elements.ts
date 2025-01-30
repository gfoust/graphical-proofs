import * as React from 'react';

type CustomElement = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "pf-builder-panel": CustomElement;
      "pf-builder-rule": CustomElement;
      "pf-consequence": CustomElement;
      "pf-consequences": CustomElement;
      "pf-formula-block": CustomElement;
      "pf-formulas-panel": CustomElement;
      "pf-formula-picker": CustomElement;
      "pf-goal-panel": CustomElement;
      "pf-page": CustomElement;
      "pf-pattern-atom": CustomElement;
      "pf-pattern-block": CustomElement;
      "pf-pattern-grid": CustomElement;
      "pf-pattern-var": CustomElement;
      "pf-pattern-view": CustomElement;
      "pf-premises": CustomElement;
      "pf-problem": CustomElement;
      "pf-rule-block": CustomElement;
      "pf-rule-list": CustomElement;
      "pf-rule-name": CustomElement;
      "pf-rule-view": CustomElement;
    }
  }
}

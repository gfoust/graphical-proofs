import * as React from 'react';

type CustomElement = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "pf-page": CustomElement;
      "pf-problem": CustomElement;
      "pf-formulas-panel": CustomElement;
      "pf-formula-block": CustomElement;
      "pf-pattern-view": CustomElement;
      "pf-pattern-atom": CustomElement;
      "pf-pattern-var": CustomElement;
      "pf-pattern-grid": CustomElement;
    }
  }
}

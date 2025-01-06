import * as React from 'react';

type CustomElement = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "proof-page": HTMLAttributes<HTMLElement>;
      "proof-display": HTMLAttributes<HTMLElement>;
      "pf-formulas-panel": HTMLAttributes<HTMLElement>;
      "pf-formula-block": CustomElement;
      "pf-pattern-view": CustomElement;
      "pf-pattern-atom": CustomElement;
      "pf-pattern-var": CustomElement;
      "pf-pattern-grid": CustomElement;
    }
  }
}

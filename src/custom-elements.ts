import * as React from 'react';

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "proof-page": HTMLAttributes<HTMLElement>;
      "proof-display": HTMLAttributes<HTMLElement>;
      "proof-formulas-panel": HTMLAttributes<HTMLElement>;
      "proof-formula-block": HTMLAttributes<HTMLElement>;
      "pf-pattern-view": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "pf-pattern-atom": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "pf-pattern-var": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "pf-pattern-grid": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

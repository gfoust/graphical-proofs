import * as React from 'react';

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "proof-page": HTMLAttributes<HTMLElement>;
      "proof-display": HTMLAttributes<HTMLElement>;
      "proof-patterns-panel": HTMLAttributes<HTMLElement>;
      "proof-formula": HTMLAttributes<HTMLElement>;
      "proof-atom": HTMLAttributes<HTMLElement>;
      "proof-grid": HTMLAttributes<HTMLElement>;
    }
  }
}

import { useContext, useLayoutEffect } from "react";

import App from "../app";
import { Actions } from "../model/actions";

export function useScrollPosition(id: string) {
  const scrollPositions = useContext(App.ScrollPositionsContext);

  useLayoutEffect(() => {
    if (scrollPositions && scrollPositions[id]) {
      document.getElementById(id)?.scrollTo({ top: scrollPositions[id] });
    }
    return () => {
      const element = document.getElementById(id);
      if (element) {
        App.dispatch(Actions.saveScrollPosition({ [id]: element.scrollTop }));
      }
    }
  }, []);
}
import { Panel } from "./model";

export type Action = ShowPanel;

export interface ShowPanel {
  type: 'show-panel',
  panel: Panel,
}

import App from "../../app";
import { Actions } from "../../model/actions";
import { Rule } from "../../model/pattern";
import RuleView from "../components/rule-view";

import "./rules.scss";
import { useScrollPosition } from "../scroll";
import FormulaPicker from "../components/formula-picker";
import { useContext } from "react";
import { Palette } from "../../model/palette";

export interface RulesPanelProps {
  rules: Rule[];
}

function handleRuleClicked() {

}

export default function RulesPanel({ rules }: RulesPanelProps) {
  useScrollPosition("rule-list");
  const palette = useContext(App.PaletteContext) as Palette;

  let i = 0;
  return (
    <pf-builder-panel>
      <FormulaPicker palette={palette}/>
      <pf-builder-main>
        <pf-rule-list id="rule-list">
        {
          rules.map(rule =>
            <pf-rule-spacer key={i++}>
              <pf-rule-block onClick={() => App.dispatch(Actions.selectRule(rule))}>
                <RuleView rule={rule}/>
              </pf-rule-block>
            </pf-rule-spacer>
          )
        }
        </pf-rule-list>
      </pf-builder-main>
    </pf-builder-panel>
  )
}
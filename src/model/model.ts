
export const enum Panel {
  Builder = 'builder',
  Goal = 'goal',
  Formulas = 'formulas',
  Rules = 'rules'
}

export interface Model {
  panel: Panel,
}

export interface InitialModelOptions {

}

export function initialModel(options: InitialModelOptions): Model {
  return {
    panel: Panel.Rules
  };
}




export const enum Panel {
  Builder = 'builder',
  Derivation = 'derivation',
  Goal = 'goal',
  Patterns = 'patterns',
  Rules = 'rules'
}

export interface Model {
  panel: Panel,
}

export interface InitialModelOptions {

}

export function initialModel(options: InitialModelOptions): Model {
  return {
    panel: Panel.Patterns
  };
}



import { Pattern } from "./formula";

export interface Rule {
  premises: Pattern[],
  consequences: Pattern[]
}

import { IChampionPassive, IChampionSpell } from "./champion";

export interface ISpellList {
  P: IChampionPassive[],
  Q: IChampionSpell[],
  W: IChampionSpell[],
  E: IChampionSpell[],
  R: IChampionSpell[],
}

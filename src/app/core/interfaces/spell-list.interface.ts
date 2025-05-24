import { IChampionPassive, IChampionSpell } from "./champion";

export interface ISpellList {
  P: IChampionSpell[],
  Q: IChampionSpell[],
  W: IChampionSpell[],
  E: IChampionSpell[],
  R: IChampionSpell[],
}

import { IChampion, IChampionSpell } from "./champion";

export interface IUltimateChampion {
  champion: IChampion,
  spells: {
    P: IChampionSpell,
    Q: IChampionSpell,
    W: IChampionSpell,
    E: IChampionSpell,
    R: IChampionSpell,
  }
}

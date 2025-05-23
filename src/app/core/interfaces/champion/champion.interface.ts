import { IChampionImage } from "./champion-image.interface";
import { IChampionInfo } from "./champion-info.interface";
import { IChampionPassive } from "./champion-passive.interface";
import { IChampionSkin } from "./champion-skin.interface";
import { IChampionSpell } from "./champion-spell.interface";
import { IChampionStats } from "./champion-stats.interaface";

export interface IChampion {
  id: string;
  key: string;
  name: string;
  title: string;
  image: IChampionImage;
  skins: IChampionSkin[];
  lore: string;
  blurb: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  partype: string;
  info: IChampionInfo;
  stats: IChampionStats;
  spells: IChampionSpell[];
  passive: IChampionPassive;
  selected: boolean;
}


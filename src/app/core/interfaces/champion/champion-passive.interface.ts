import { IChampionImage } from "./champion-image.interface";

export interface IChampionPassive {
  name: string;
  description: string;
  image: IChampionImage;
  championName: string;
  selected: boolean;
}

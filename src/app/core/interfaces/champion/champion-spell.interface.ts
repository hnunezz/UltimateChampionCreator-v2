import { IChampionImage } from "./champion-image.interface";

export interface IChampionSpell {
  name: string;
  description: string;
  image: IChampionImage;
  championName: string;
  selected: boolean;
}
//!full
// id: string;
// name: string;
// description: string;
// tooltip: string;
// leveltip: {
//   label: string[];
//   effect: string[];
// };
// maxrank: number;
// cooldown: number[];
// cooldownBurn: string;
// cost: number[];
// costBurn: string;
// datavalues: any;
// effect: Array<number[] | null>;
// effectBurn: Array<string | null>;
// vars: any[];
// costType: string;
// maxammo: string;
// range: number[];
// rangeBurn: string;
// image: IChampionImage;
// resource: string;

import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { UccButtonComponent } from '../../shared/components';
import { IChampion } from '../../core';

@Component({
  selector: 'ucc-share',
  imports: [UccButtonComponent],
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss'
})
export class ShareComponent {
  ultimateChampion = input<any>();
  hasChampionSelected = input<boolean>();

  urlBaseSplash = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/'
  urlBaseSpell = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/spell/';
  urlBasePassive = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/passive/';

  get hasP(): boolean {
    return this.ultimateChampion().spells.hasP;
  }
  get hasQ(): boolean {
    return this.ultimateChampion().spells.hasQ;
  }
  get hasW(): boolean {
    return this.ultimateChampion().spells.hasW;
  }
  get hasE(): boolean {
    return this.ultimateChampion().spells.hasE;
  }
  get hasR(): boolean {
    return this.ultimateChampion().spells.hasR;
  }

}

import { ChampionsService } from './../../core/services/champions.service';
import { Component, inject, input } from '@angular/core';
import html2canvas from 'html2canvas';
import { UccButtonComponent } from '../../shared/components';
import { DialogService } from '../../core/services/dialog.service';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { InputTextComponent } from "../../shared/components/ucc-input/ucc-input.component";

@Component({
  selector: 'ucc-share',
  imports: [UccButtonComponent, InputTextComponent],
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss'
})
export class ShareComponent {
  private dialogService = inject(DialogService);
  private championsService = inject(ChampionsService);

  ultimateChampion = input<any>();
  hasChampionSelected = input<boolean>();

  urlBaseSplash = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/'
  urlBaseSpell = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/spell/';
  urlBasePassive = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/passive/';

  capturedImage: any;
  nick: string = '';
  loading: boolean = false;

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
  get enableToShare(): boolean {
    return !(this.hasP && this.hasQ && this.hasW && this.hasE && this.hasR && this.hasChampionSelected() as boolean);
  }

  imageView() {
    this.championsService.finalizeSpellViewSubject.next(true);


    setTimeout(() => {

      this.loading = true;
      html2canvas(document.querySelector("#capture") as HTMLElement).then(canvas => {
        this.capturedImage = canvas.toDataURL();
        this.loading = false;
        this.openImageViewer();
      });
    }, 100);

  }

  handleNick(event: any) {
    this.nick = event
  }

  private openImageViewer() {
    this.dialogService
      .open(ImageViewerComponent, {
        data: {
          capturedImage: this.capturedImage
        }
      })
      .subscribe((response) => {
      });
  }

  private isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

}



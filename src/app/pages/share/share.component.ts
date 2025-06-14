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

  ultimateChampion = input<any>();
  hasChampionSelected = input<boolean>();

  urlBaseSplash = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/'
  urlBaseSpell = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/spell/';
  urlBasePassive = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/passive/';

  capturedImage: any;
  nick: string = '';

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

  download() {
    html2canvas(document.querySelector("#capture") as HTMLElement).then(async canvas => {
      this.capturedImage = canvas.toDataURL();

      canvas.toBlob(function (blob) {
        var reader = new FileReader();
        reader.readAsDataURL(blob as Blob);
        reader.onloadend = function () {
          let base64data = reader.result;
        }

      });

      if (!this.isMobile()) {
        setTimeout(() => {
          const imageElement = document.getElementById("YourImage") as HTMLElement;
          const imageStringFodase = imageElement.getAttribute("src") as string;

          const saveImage = (downloadUrl: string) => {
            const downloadImage = document.createElement("a");
            document.body.appendChild(downloadImage);
            downloadImage.setAttribute("download", 'ultimate-champion');
            downloadImage.href = downloadUrl;
            downloadImage.click();
            downloadImage.remove();
          };

          saveImage(imageStringFodase)
        }, 100);
      } else {
        this.dialogService
          .open(ImageViewerComponent, {
            data: {
              capturedImage: this.capturedImage
            }
          })
          .subscribe((response) => {
          });
      }
    });

  }

  handleNick(event: any){
    this.nick = event
  }

  private isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

}



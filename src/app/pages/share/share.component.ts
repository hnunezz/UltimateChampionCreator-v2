import { Component, input } from '@angular/core';
import html2canvas from 'html2canvas';
import { UccButtonComponent } from '../../shared/components';

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

  base64P: any;

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

  capturedImage: any;

  clickme() {
    html2canvas(document.querySelector("#capture") as HTMLElement).then(async canvas => {
      this.capturedImage = canvas.toDataURL();

      canvas.toBlob(function (blob) {
        var reader = new FileReader();
        reader.readAsDataURL(blob as Blob);
        reader.onloadend = function () {
          let base64data = reader.result;
        }

      });
    });

    const imageElement = document.getElementById("YourImage")as HTMLElement;
    const imageStringFodase = imageElement.getAttribute("src") as string;

    const saveImage = (downloadUrl: string) => {
      const downloadImage = document.createElement("a");
      document.body.appendChild(downloadImage);
      downloadImage.setAttribute("download", "image");
      downloadImage.href = downloadUrl;
      downloadImage.click();
      downloadImage.remove();
    };

    saveImage(imageStringFodase)
  }


}



import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { ChampionSelectDialogComponent } from '../../champion-select/champion-select-dialog.component';
import { ShareImageService } from '../../../core';

@Component({
  selector: 'ucc-image-viewer',
  imports: [],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss'
})
export class ImageViewerComponent implements OnInit {
  private shareImageService = inject(ShareImageService);

  dialogRef = inject<DialogRef<boolean>>(DialogRef<ChampionSelectDialogComponent>);

  capturedImage: any;
  shareLink: string;

  constructor(@Inject(DIALOG_DATA) public data: { capturedImage: any }) {
    this.capturedImage = data.capturedImage;
  }

  ngOnInit(): void {
    this.saveImage();
  }

  get() {
    this.shareImageService.get(0).subscribe(res => console.log(res))
  }

  private saveImage() {
    this.shareImageService.save(this.capturedImage).subscribe((res: { id: string }) => {
      this.shareLink = `https://ultimate-champion-creator.vercel.app/share/${res.id}`
    });

  }

  downloadImage() {
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
  }
}

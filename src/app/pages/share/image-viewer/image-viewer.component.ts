import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, Inject } from '@angular/core';
import { ChampionSelectDialogComponent } from '../../champion-select/champion-select-dialog.component';

@Component({
  selector: 'ucc-image-viewer',
  imports: [],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss'
})
export class ImageViewerComponent {
  dialogRef = inject<DialogRef<boolean>>(DialogRef<ChampionSelectDialogComponent>);

  capturedImage: any;

  constructor(@Inject(DIALOG_DATA) public data: { capturedImage: any }) {
    this.capturedImage = data.capturedImage;
  }
}

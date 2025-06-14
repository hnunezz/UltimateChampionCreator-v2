import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'ucc-more-info-modal',
  imports: [],
  templateUrl: './more-info-modal.component.html',
  styleUrl: './more-info-modal.component.scss'
})
export class MoreInfoModalComponent {
  dialogRef = inject(DialogRef<MoreInfoModalComponent>);

}

import { Component, inject } from '@angular/core';
import { DialogService } from '../../core/services/dialog.service';
import { MoreInfoModalComponent } from './more-info-modal/more-info-modal.component';

@Component({
  selector: 'ucc-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private dialogService = inject(DialogService)
  goTo(url: string) {
    window.open(url, '_blank');
  }

  moreInformation() {
    this.dialogService.open(MoreInfoModalComponent, {
      data: {},
    })
  }
}

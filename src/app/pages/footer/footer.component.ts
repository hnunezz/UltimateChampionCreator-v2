import { Component } from '@angular/core';

@Component({
  selector: 'ucc-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  moreInformation: boolean = false;

  goTo(url: string) {
    window.open(url, '_blank');
  }
}

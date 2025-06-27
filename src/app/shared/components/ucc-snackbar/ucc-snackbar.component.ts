import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'ucc-snackbar',
  imports: [NgClass],
  templateUrl: './ucc-snackbar.component.html',
  styleUrl: './ucc-snackbar.component.scss'
})
export class UccSnackbarComponent {
  show: boolean = false;
  text: string = "";

  constructor(public snackbarService: SnackbarService) {
    this.snackbarService.get().subscribe((text: string) => {
      this.show = true;
      this.text = text;
      setTimeout(() => {
        this.show = false;
      },3000)
    });

  }
}

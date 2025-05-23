import { NgClass } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'ucc-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ucc-button.component.html',
})
export class UccButtonComponent {
  label = input<string>();
  styleClass = input<string>();
  disable = input<boolean>();

  @Output() onClick = new EventEmitter();

  onClickEmitter() {
    if (!this.disable) { this.onClick.emit(); }
  }
}

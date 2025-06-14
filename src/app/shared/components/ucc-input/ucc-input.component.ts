import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ucc-input',
  standalone: true,
  imports: [FormsModule, NgStyle],
  templateUrl: './ucc-input.component.html',
  styleUrls: ['./ucc-input.component.scss']
})
export class InputTextComponent {

  placeholder = input<string>();
  disabled = input<boolean>(false);
  type = input<string>('text');
  containerWidth = input<string>('100%');
  @Input() model = '';

  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();

  validateKey(e: KeyboardEvent) {
    if (this.type().startsWith('t')) {
      if (e.keyCode > 47 && e.keyCode < 58) { e.preventDefault(); }
    } else {
      if (e.keyCode > 47 && e.keyCode < 58) { e.preventDefault(); }
    }
  }
}

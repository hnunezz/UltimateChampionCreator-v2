import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ucc-triangle',
  template: `
    <div [class]="'t4 ' + type()" ></div>
    <div [class]="'t3 ' + type()" ></div>
    <div [class]="'t2 ' + type()" ></div>
    <div [class]="'t1 ' + type()" ></div>
  `,
  styleUrls: ['./triangle.component.scss']
})
export class TriangleComponent {
  type = input<string>();
}

import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Observable } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';
import { IChampion } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private dialog = inject(Dialog);

  open(component: ComponentType<any>, p0: { data: {}; }): Observable<any> {
    return this.openDialog(component, {
      data: p0.data,
      config: {},
    });
  }

  private openDialog(component: ComponentType<any>, p0: { data: {}; config: {}; }): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      autoFocus: false,
      disableClose: true,
      data: p0.data,
    });

    return dialogRef.closed;
  }
}

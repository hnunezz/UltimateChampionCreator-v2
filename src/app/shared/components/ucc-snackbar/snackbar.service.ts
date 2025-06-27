import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  public observable: Subject<string> = new Subject();

  constructor() {
    this.observable = new Subject<any>();
  }

  public open(text: string) {
    this.observable.next(text);
  }

  get(): Observable<string> {
    return this.observable.asObservable();
  }
}

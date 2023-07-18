import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedSideNavInfoServiceService {

  private actionSource = new Subject<string>();
  action$ = this.actionSource.asObservable();

  constructor() { }

  triggerAction(option: string) {
    this.actionSource.next(option);
  }
}

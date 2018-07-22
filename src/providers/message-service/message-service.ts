import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs";

export class MyAppEvent {
  type: string;
  data: any;
}
/*
  Generated class for the MessageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageServiceProvider {

  private myAppEventSubject: Subject<MyAppEvent> = new Subject<MyAppEvent>();
  public readonly myAppEvent$: Observable<MyAppEvent> = this.myAppEventSubject.asObservable();

  broadcast(name: string, data) {
    this.myAppEventSubject.next({ type: name, data: data });
  }

}

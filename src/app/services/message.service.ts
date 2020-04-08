import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new BehaviorSubject({});

  constructor() { }

  send(message: string, data: any) {
    this.subject.next({ name: message, data: data });
  }

  clear() {
    this.subject.next({});
  }

  get(): Observable<any> {
    return this.subject.asObservable();
  }
}

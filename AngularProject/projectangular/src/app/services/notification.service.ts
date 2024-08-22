import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private deleteSubject = new Subject<void>();

  delete$ = this.deleteSubject.asObservable();

  notifyDelete() {
    this.deleteSubject.next();
  }
}

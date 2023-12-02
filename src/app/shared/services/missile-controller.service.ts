import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MissileControllerService {
  private movementSubject = new Subject<String>();
  movement$: Observable<String> = this.movementSubject.asObservable();

  triggerMovement(direction: string): void {
    this.movementSubject.next(direction);
  }

  private launchSubject = new Subject<boolean>();
  launch$: Observable<boolean> = this.launchSubject.asObservable();

  setLaunched(launched: boolean): void {
    this.launchSubject.next(launched);
  }
}

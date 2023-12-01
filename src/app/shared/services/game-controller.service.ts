import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameControllerService {
  private enemyExplosionSubject = new Subject<number>();

  enemyExplosion$: Observable<number> = this.enemyExplosionSubject.asObservable();

  triggerEnemyExplosion(enemyId: number): void {
    this.enemyExplosionSubject.next(enemyId);
  }
}

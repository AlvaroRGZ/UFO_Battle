import {Component, Input} from '@angular/core';
import {Enemy} from "../model/enemy";
import {GameControllerService} from "../shared/services/game-controller.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css']
})
export class EnemyComponent {
  enemies: Enemy[];
  enemies_horizontal_step: number = 5;
  pid: number;

  constructor(private gameController: GameControllerService) {
    this.enemies = [];
    this.pid = 0;
    for (let i = 0; i < 5; i++) {
      this.enemies.push(new Enemy(i));
    }
    this.startMoving();
  }

  private moveUFOs(): void {
    for (let i: number = 0; i < this.enemies.length; i++) {
      this.enemies[i].move(this.enemies_horizontal_step);
    }
  }

  startMoving() {
    if (this.pid != 0) {
      clearInterval(this.pid);
    }
    this.pid = setInterval(() => this.moveUFOs(), 25);
  }

  stop() {
    clearInterval(this.pid);
  }

  ngOnInit(): void {
    this.gameController.enemyExplosion$.pipe(takeUntil(this.destroy$)).subscribe((enemyId) => {
      if (this.enemies && 0 <= enemyId && enemyId < this.enemies.length) {
        this.enemies[enemyId].explode();
      }
    });
  }

  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

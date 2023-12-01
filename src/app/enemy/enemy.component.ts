import {Component, Input} from '@angular/core';
import {Enemy} from "../model/enemy";

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css']
})
export class EnemyComponent {
  enemies: Enemy[];
  enemies_horizontal_step: number = 5;
  pid: number;

  constructor() {
    this.enemies = [];
    this.pid = 0;
    for (let i = 1; i <= 7; i++) {
      this.enemies.push(new Enemy(i));
    }
    this.startMoving();
  }

  private createEnemies(number: number) {
    for (let i = 1; i <= number; i++) {
      this.enemies.push(new Enemy(i));
    }
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
}

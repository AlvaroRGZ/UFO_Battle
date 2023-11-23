import { Component } from '@angular/core';
import {EnemyComponent} from "../enemy/enemy.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  enemies: EnemyComponent[] = [];
  constructor() {
    this.createEnemies(5);
  }

  private createEnemies(number: number) {
    for (let i = 1; i <= number; i++) {
      this.enemies.push(new EnemyComponent());
    }
  }
}

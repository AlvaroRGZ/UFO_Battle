import {Component} from '@angular/core';
import {Enemy} from "../model/enemy";
import {LocalStorageManagerService} from "../shared/services/local-storage-manager.service";

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css']
})
export class EnemyComponent {
  enemies: Enemy[];
  enemies_horizontal_step: number = 5;
  pid: number;

  constructor(private localStorage: LocalStorageManagerService) {
    this.enemies = [];
    this.pid = 0;
    let numberOfEnemies: number = localStorage.getNumberOfUFOs();
    for (let i = 0; i < numberOfEnemies; i++) {
      this.enemies.push(new Enemy(i));
    }
    this.startMoving();
  }

  private moveUFOs(): void {
    for (let i: number = 0; i < this.enemies.length; i++) {
      this.enemies[i].move(this.enemies_horizontal_step);
    }
  }

  startMoving(): void {
    if (this.pid != 0) {
      clearInterval(this.pid);
    }
    this.pid = setInterval(() => this.moveUFOs(), 25);
  }

  stop(): void {
    clearInterval(this.pid);
  }

  public checkForHit(hpos: number, vpos: number, width: number, bottom: number): number {
    for (let enemy of this.enemies) {
      if (enemy.checkForHit(hpos, vpos, width, bottom)) {
        return enemy.numeralID
      }
    }
    return -1;
  }
}

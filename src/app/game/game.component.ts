import {Component, HostListener, ViewChild} from '@angular/core';
import {GameControllerService} from "../shared/services/game-controller.service";
import {MissileControllerService} from "../shared/services/missile-controller.service";
import {MissileComponent} from "../missile/missile.component";
import {EnemyComponent} from "../enemy/enemy.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @ViewChild(MissileComponent) missile!: MissileComponent;
  @ViewChild(EnemyComponent) enemies!: EnemyComponent;
  private pid: number = 0;

  score: number = 0;
  totalTime: number;
  timerColor: string = 'yellow';

  constructor(private gameController: GameControllerService,
              private missileController: MissileControllerService) {
    this.totalTime = 30;
    this.startTimeLeftCounter();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.missile.isLaunched()) {
      switch (event.key) {
        case 'ArrowRight':
          this.missile.moveRight();
          break;
        case 'ArrowLeft':
          this.missile.moveLeft();
          break;
        case ' ':
          this.pullTrigger();
          break;
      }
    }
  }

  explotar(id: number): void {
    this.gameController.triggerEnemyExplosion(id);
  }

  private pullTrigger() {
    this.missile.markAsLaunched()
    this.pid = setInterval(() => this.launch(), 10);
  }

  private launch() {
    if (this.missile.isLaunched()) {
      this.missile.ascend(this.pid);
      this.checkForHit();
    }
  }

  private checkForHit() {
    let destroyedEnemy: number = this.enemies.checkForHit(this.missile.left, this.missile.height, this.missile.width, this.missile.bottom);
    if (destroyedEnemy >= 0) {
      this.enemies.enemies.at(destroyedEnemy)!.explode();
      this.missile.resetPosition(this.pid);
    }
  }

  startTimeLeftCounter(){
    let timePID = setInterval(() => {
        if (this.totalTime === 0) {
          clearInterval(timePID);
          this.displayEndOfTheGame();
        } else {
          this.totalTime--;
          if (this.totalTime === 15) {
            this.timerColor = 'red';
          }
        }
      }
      , 1000);
  }

  private displayEndOfTheGame() {

  }
}

import {Component} from '@angular/core';
import {GameControllerService} from "../shared/services/game-controller.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  constructor(private gameController: GameControllerService) {
  }

  stopUFOs() {
      console.log("Parar ufos");
  }

  explotar(id: number): void {
    this.gameController.triggerEnemyExplosion(id);
  }

}

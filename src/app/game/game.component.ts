import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  constructor() {
  }

  stopUFOs() {
      console.log("Parar ufos");
  }

  explotar(id: number): void {
    // Enviar mensaje al hijo
  }

}

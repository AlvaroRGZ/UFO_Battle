import { Component } from '@angular/core';
import {GameComponent} from "../game/game.component";

@Component({
  selector: 'app-missile',
  templateUrl: './missile.component.html',
  styleUrls: ['./missile.component.css']
})
export class MissileComponent {
  vstep: number = 20;
  launched: boolean = false;
  hstep: number = 15;

  width: number = 40;
  position: string = 'absolute';
  left: number = 300;
  bottom: number = 0;
  height: number = 70;
  zIndex: number = 10;

  constructor() {}

  ascend(game: GameComponent): void {
    let vpos_m = this.bottom;
    let displacement = vpos_m + this.vstep;
    if (displacement < window.innerHeight) {
      this.bottom = displacement;
    } else {
      game.score -= 25;
      this.resetPosition(game.pid);
    }
  }

  moveRight(): void {
    const hpos_m = this.left;
    if (hpos_m < window.innerWidth - this.width - 8) {
      this.left = hpos_m + this.hstep;
    }
  }

  moveLeft(): void {
    const hpos_m = this.left;
    if (hpos_m > this.width) {
      this.left = hpos_m - this.hstep;
    }
  }

  resetPosition(pid: number): void {
    this.bottom = 0;
    this.markAsNotLaunched();
    clearInterval(pid);
  }

  isLaunched(): boolean {
    return this.launched;
  }

  markAsLaunched(): void {
    this.launched = true;
  }

  markAsNotLaunched(): void {
    this.launched = false;
  }

  isMissileLaunched() {
    return false;
  }
}

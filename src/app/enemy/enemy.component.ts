import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css']
})
export class EnemyComponent {

  id: string;
  @Input() numeralID: number = 1;

  width: number;
  position: string;
  left: number;
  top: number;

  src: string = 'assets/images/ufo.png';

  constructor() {
    this.id = 'enemy' + this.numeralID;

    this.width = 60;
    this.position = 'absolute';
    this.top = this.width + this.numeralID * this.width;
    this.left = Math.random() * (window.innerWidth - this.width);
  }

  ngOnInit(): void {
    this.width = 60;
    this.position = 'absolute';
    this.top = this.width + this.numeralID * this.width;
    this.left = Math.random() * (window.innerWidth - this.width);
  }

  move(hstep: number, Rlimit: number): number {
    const newHpos = this.left + hstep;
    if (newHpos > Rlimit - this.width || newHpos < 0) {
      return -1;
    }
    this.left = newHpos;
    return 1;
  }
  explode() {
    this.src = 'assets/gifs/explosion.gif';
  }

  reset() {
    this.src = 'assets/images/ufo.png';
  }
}

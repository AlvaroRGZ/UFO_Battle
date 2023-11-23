export class Enemy {
  id: string;
  numeralID: number;

  width: number;
  position: string;
  left: number;
  top: number;

  src: string;

  constructor(id: number) {
    this.numeralID = id;
    this.id = 'ufo' + id;
    this.src = 'src/assets/images/ufo.png';

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
    this.src = 'src/assets/gifs/explosion.gif';
  }

  reset() {
    this.src = 'src/assets/images/ufo.png';
  }
}

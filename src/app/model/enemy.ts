export class Enemy {
  id: string;
  numeralID: number;

  width: number;
  position: string;
  left: number;
  top: number;
  direction: number;
  src: string;

  constructor(id: number) {
    this.numeralID = id;
    this.id = 'ufo' + id;
    this.src = 'assets/images/ufo.png';

    this.width = 60;
    this.position = 'absolute';
    this.top = this.width + this.numeralID * this.width;
    this.left = Math.random() * (window.innerWidth - this.width);
    this.direction = Math.random() < 0.5 ? -1 : 1;
  }

  move(hstep: number): void {
    const newHpos = this.left + hstep * this.direction;
    if (newHpos > window.innerWidth - this.width || newHpos < 0) {
      this.direction *= -1;
    }
    // console.log(this.id + " value " + newHpos);
    this.left = Math.floor(newHpos);
  }

  public showExplosion() {
    this.explode();
    setTimeout(() => this.reset(), 1000);
  }

  explode() {
    this.src = 'assets/gifs/explosion.gif';
  }

  reset() {
    this.src = 'assets/images/ufo.png';
  }
}

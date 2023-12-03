export class Enemy {
  numeralID: number;

  width: number;
  position: string;
  left: number;
  top: number;
  direction: number;
  src: string;

  constructor(id: number) {
    this.numeralID = id;
    this.src = 'assets/images/ufo.png';

    this.width = 60;
    this.position = 'absolute';
    this.top = this.numeralID * this.width;
    this.left = Math.random() * (window.innerWidth - this.width);
    this.direction = Math.random() < 0.5 ? -1 : 1;
  }

  move(hstep: number): void {
    const newHpos: number = this.left + hstep * this.direction;
    if (newHpos > window.innerWidth - this.width - 8 || newHpos < 0) {
      this.direction *= -1;
    }
    this.left = Math.floor(newHpos);
  }

  explode(): void {
    this.src = 'assets/gifs/explosion.gif';
    setTimeout(() => this.reset(), 1000);
  }

  reset(): void {
    this.src = 'assets/images/ufo.png';
  }

  checkForHit(hpos: number, vpos: number, width: number, height: number): boolean {
    return (
      window.innerHeight - (this.top + this.width) <= vpos + height &&
      window.innerHeight - (this.top + this.width) >= vpos &&
      hpos + width / 2 >= this.left &&
      hpos + width / 2 <= this.left + this.width
    );
  }
}

import {Component, HostListener, ViewChild, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import Swal from 'sweetalert2'

import {LocalStorageManagerService} from "../shared/services/local-storage-manager.service";
import {SessionStorageManagerService} from "../shared/services/session-storage-manager.service";
import {FenmAPIService} from "../shared/services/fenm-api.service";
import {ToastrService} from "ngx-toastr";

import {MissileComponent} from "../missile/missile.component";
import {EnemyComponent} from "../enemy/enemy.component";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers:  [
    FenmAPIService,
    LocalStorageManagerService,
    SessionStorageManagerService,
    ToastrService
  ]
})
export class GameComponent implements OnDestroy {
  @ViewChild(MissileComponent) missile!: MissileComponent;
  @ViewChild(EnemyComponent) enemies!: EnemyComponent;

  pid: number = 0;
  score: number = 0;
  totalTime: number;
  timerPID: number = 0;
  timerColor: string = 'yellow';

  userLoggedIn: boolean = false;

  constructor(private router: Router,
              private localStorageManager: LocalStorageManagerService,
              private sessionStorageManager: SessionStorageManagerService,
              private apiService: FenmAPIService,
              private toastrService: ToastrService) {
    this.userLoggedIn = this.sessionStorageManager.userIsLoggedIn();
    this.displayTutorial();
    this.totalTime = localStorageManager.getTime();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
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

  private pullTrigger(): void {
    this.missile.markAsLaunched()
    this.pid = setInterval(() => this.launch(), 10);
  }

  private launch(): void {
    if (this.missile.isLaunched()) {
      this.missile.ascend(this);
      this.checkForHit();
    }
  }

  private checkForHit(): void {
    let destroyedEnemy: number = this.enemies.checkForHit(this.missile.left, this.missile.height, this.missile.width, this.missile.bottom);
    if (destroyedEnemy >= 0) {
      this.enemies.enemies.at(destroyedEnemy)!.explode();
      this.missile.resetPosition(this.pid);
      this.score += 100;
    }
  }

  displayTutorial(): void {
    Swal.fire({
      title: 'UFO Game Tutorial',
      html: `
      <div>
        <p>Welcome to the UFO Game! Here's a quick guide to get you started:</p>
        <ul>
          <li>Use the <strong>arrow keys</strong> to move the missile <strong>left and right</strong>.</li>
          <li>Press the <strong>space bar</strong> to launch the missile.</li>
        </ul>
        <p>Shoot down the UFOs and score points before the time runs out!</p>
      <div>
      `,
      icon: 'info',
      confirmButtonText: 'Start'
    })
      .then((): void => {
        this.startTimeLeftCounter();
      });
  }

  startTimeLeftCounter(): void{
    this.timerPID = setInterval((): void => {
        if (this.totalTime === 0) {
          clearInterval(this.timerPID);
          this.enemies.stop();
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

  private displayEndOfTheGame(): void {
    Swal.fire({
      title: "<strong>Game over!</strong>",
      html: `
        <div>
          <p>Score: <b>${this.score}</b></p>
          <p>UFOs Used: <b>${this.localStorageManager.getNumberOfUFOs()}</b></p>
          <p>Penalties: <b>- ${this.calculatePenalties()}</b></p>
          <p>Final Score: <b>${this.calculateFinalScore()}</b></p>
        </div>`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Play again",
      denyButtonText: `Save record`,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    })
      .then((result): void => {
        if (result.isConfirmed) {
          window.location.reload();
        } else if (result.isDenied) {
          this.saveRecord();
        } else {
          this.router.navigate(['presentation']);
        }
      });
  }

  calculatePenalties(): number {
    return 50 * (this.localStorageManager.getNumberOfUFOs() - 1);
  }

  calculateFinalScore(): number {
    let factor: number = this.localStorageManager.getTime() / 60;
    let penalty: number = this.calculatePenalties();
    return (this.score / factor) - penalty;
  }

  private saveRecord(): void {
    if (this.userLoggedIn) {
      this.apiService.saveUserRecord(
        this.score,
        this.localStorageManager.getNumberOfUFOs(),
        this.localStorageManager.getTime(),
        this.sessionStorageManager.getJWToken()
      ).subscribe(
        (response: any): void => {
          if (response.status === 201) {
            this.toastrService.success("Record saved successfully", "Record saved!");
          } else {
            console.log('Save: Worked but got an unexpected error');
          }
        },
        error => {
          if (error.status === 401) {
            this.toastrService.error("Your session has expired", "Can not save");
            console.log('Not valid token due to session expiration');
          } else {
            console.log('Unexpected error');
          }
        }
      );
    } else {
      this.toastrService.error("You must be logged in", "Can not save");
    }
    this.displayEndOfTheGame();
  }

  ngOnDestroy(): void {
    clearInterval(this.pid);
    clearInterval(this.timerPID);
  }
}

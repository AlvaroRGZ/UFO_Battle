import {Component, HostListener, ViewChild, OnDestroy} from '@angular/core';
import {GameControllerService} from "../shared/services/game-controller.service";
import {MissileComponent} from "../missile/missile.component";
import {EnemyComponent} from "../enemy/enemy.component";
import {LocalStorageManagerService} from "../shared/services/local-storage-manager.service";
import Swal from 'sweetalert2'
import {Router} from "@angular/router";
import {SessionStorageManagerService} from "../shared/services/session-storage-manager.service";
import {FenmAPIService} from "../shared/services/fenm-api.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
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
              private gameController: GameControllerService,
              private localStorageManager: LocalStorageManagerService,
              private sessionStorageManager: SessionStorageManagerService,
              private apiService: FenmAPIService,
              private toastrService: ToastrService) {
    this.userLoggedIn = this.sessionStorageManager.userIsLoggedIn();
    this.displayTutorial();
    this.totalTime = localStorageManager.getTime();
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

  private pullTrigger() {
    this.missile.markAsLaunched()
    this.pid = setInterval(() => this.launch(), 10);
  }

  private launch() {
    if (this.missile.isLaunched()) {
      this.missile.ascend(this);
      this.checkForHit();
    }
  }

  private checkForHit() {
    let destroyedEnemy: number = this.enemies.checkForHit(this.missile.left, this.missile.height, this.missile.width, this.missile.bottom);
    if (destroyedEnemy >= 0) {
      this.enemies.enemies.at(destroyedEnemy)!.explode();
      this.missile.resetPosition(this.pid);
      this.score += 100;
    }
  }

  startTimeLeftCounter(){
    this.timerPID = setInterval(() => {
        if (this.totalTime === 0) {
          clearInterval(this.timerPID);
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

  calculateFinalScore() {
    let factor = this.localStorageManager.getTime() / 60;
    let penalty = this.calculatePenalties();
    return (this.score / factor) - penalty;
  }

  calculatePenalties() {
    return 50 * (this.localStorageManager.getNumberOfUFOs() - 1);
  }

  private displayEndOfTheGame() {
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
      .then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else if (result.isDenied) {
          this.saveRecord();
        } else {
          this.router.navigate(['presentation']);
        }
      });
  }

  displayTutorial() {
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
      .then(() => {
        this.startTimeLeftCounter();
      });
  }

  private saveRecord() {
    if (this.userLoggedIn) {
      this.apiService.saveUserRecord(
        this.score,
        this.localStorageManager.getNumberOfUFOs(),
        this.localStorageManager.getTime(),
        this.sessionStorageManager.getJWToken()
      ).subscribe(
        (response: any) => {
          if (response.status === 201) {
            this.toastrService.success("Record saved successfully", "Record saved!");
            this.displayEndOfTheGame();
          } else {
            console.log('Save: Worked but got an unexpected error');
          }
        },
        error => {
          if (error.status === 401) {
            this.toastrService.success("Your session has expired", "Can not save");
            console.log('Not valid token due to session expiration');
          } else {
            console.log('Error error');
          }
        }
      );
    } else {
      this.toastrService.error("You must be logged in", "Can not save");
      this.displayEndOfTheGame();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.pid);
    clearInterval(this.timerPID);
  }
}

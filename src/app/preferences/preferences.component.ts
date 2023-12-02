import { Component } from '@angular/core';
import {LocalStorageManagerService} from "../shared/services/local-storage-manager.service";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  numberOfUFOs: number;
  time: number;
  constructor(private localStorageManager: LocalStorageManagerService) {
    this.numberOfUFOs = this.localStorageManager.getNumberOfUFOs();
    this.time = this.localStorageManager.getTime()
  }

  loadSavedPreferences(): void {
    this.numberOfUFOs = this.localStorageManager.getNumberOfUFOs();
    this.time = this.localStorageManager.getTime()
  }

  savePreferences(event: any): void {
    event.preventDefault();
    this.localStorageManager.setNumberOfUFOs(this.numberOfUFOs)
    this.localStorageManager.setTime(this.time)
  }
}

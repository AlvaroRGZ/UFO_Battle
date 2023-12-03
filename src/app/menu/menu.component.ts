import { Component } from '@angular/core';

import {SessionStorageManagerService} from "../shared/services/session-storage-manager.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', ]
})
export class MenuComponent {
  constructor(private sessionStorageManager: SessionStorageManagerService) {}

  isLoggedIn(): boolean {
    return this.sessionStorageManager.userIsLoggedIn();
  }
}


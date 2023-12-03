import { Component } from '@angular/core';
import {SessionStorageManagerService} from "../shared/services/session-storage-manager.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private sessionStorageManager: SessionStorageManagerService,
              private toastrService: ToastrService,
              private router: Router) {
  }
  logOut() {
    this.sessionStorageManager.deleteJWT();
    this.sessionStorageManager.deleteUsername();
    this.toastrService.info("Bye", "Logged Out");
    this.router.navigate(['presentation']);
  }
}

import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SessionStorageManagerService} from "./session-storage-manager.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  constructor(private sessionStorageManager: SessionStorageManagerService,
              private toastr: ToastrService,
              private router: Router) {}

  canActivate(): boolean {
    if (this.sessionStorageManager.getJWToken() == null) {
      return true;
    }
    this.toastr.error("Already logged in, logout first", "Registration denied");
    this.router.navigate(['presentation']);
    return false;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageManagerService {
  constructor() { }

  saveJWToken(jwtoken: string) {
    sessionStorage.setItem("jwtoken", jwtoken);
  }

  getJWToken(): string {
    return sessionStorage.getItem("jwtoken") as string;
  }

  userIsLoggedIn(): boolean {
    return this.getJWToken() != null;
  }

  deleteJWT() {
    sessionStorage.removeItem("jwtoken");
  }

  saveUsername(username: string) {
    sessionStorage.setItem("username", username);
  }

  getUsername(): string {
    return sessionStorage.getItem("username") as string;
  }

  deleteUsername() {
    sessionStorage.removeItem("username");
  }
}

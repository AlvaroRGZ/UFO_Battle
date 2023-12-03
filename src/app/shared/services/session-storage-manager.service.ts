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

  deleteJWT() {
    sessionStorage.removeItem("jwtoken");
  }
}

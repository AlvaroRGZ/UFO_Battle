import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {
  DEFAULT_UFOs_NUMBER: number = 3;
  DEFAULT_TIME: number = 10;

  constructor() {}

  getNumberOfUFOs(): number {
    let numberOfUFOs: string | null = localStorage.getItem("numberOfUFOs");
    if (numberOfUFOs != null) {
      return Number(numberOfUFOs);
    }
    return this.DEFAULT_UFOs_NUMBER;
  }

  getTime(): number {
    let time: string | null = localStorage.getItem("time");
    if (time != null) {
      return Number(time);
    }
    return this.DEFAULT_TIME;
  }

  setNumberOfUFOs(numberOfUFOs: number): void {
    if (numberOfUFOs != null) {
      localStorage.setItem("numberOfUFOs", "" + numberOfUFOs);
    } else {
      localStorage.setItem("numberOfUFOs", "" + this.DEFAULT_UFOs_NUMBER);
    }
  }

  setTime(time: number): void {
    if (time != null) {
      localStorage.setItem("time", "" + time);
    } else {
      localStorage.setItem("time", "" + this.DEFAULT_TIME);
    }
  }
}

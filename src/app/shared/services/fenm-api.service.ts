import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FenmAPIService {
  constructor(private http: HttpClient) {}

  login(url: string): Observable<any> {
    return this.http.get(url, { observe: 'response' });
  }
}


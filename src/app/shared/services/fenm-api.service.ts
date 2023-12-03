import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FenmAPIService {
  private API_ROOT: string = 'http://wd.etsisi.upm.es:10000/';
  constructor(private http: HttpClient) {}

  login(urlEncodedParams: string): Observable<any> {
    const path: string = 'users/login?';
    return this.http.get(this.API_ROOT + path + urlEncodedParams,
                  { observe: 'response' });
  }

  register(username: string, email: string, password: string): Observable<any> {
    const path: string = 'users';
    const urlEncodedParams = new HttpParams()
      .set('username', username)
      .set('email', email)
      .set('password', password);

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('accept', 'application/json');

    return this.http.post(this.API_ROOT + path, urlEncodedParams,
        { headers, observe: 'response' });
  }

  doesUsernameExists(username: string): Observable<any> {
    const path: string = 'users/';
    return this.http.get(this.API_ROOT + path + username,
        { observe: 'response' });
  }

  getRecords() {
    const path: string = 'records/';
    return this.http.get(this.API_ROOT + path,
      { observe: 'response' });
  }
}


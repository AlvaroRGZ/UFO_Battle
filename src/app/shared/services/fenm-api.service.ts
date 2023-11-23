import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  register(urlEncodedParams: any): Observable<any> {
    const path: string = 'users';
    return this.http.post(this.API_ROOT + path, urlEncodedParams,
        { observe: 'response' });
  }
  doesUsernameExists(username: string): Observable<any> {
    const path: string = 'users/';
    return this.http.get(this.API_ROOT + path + username,
        { observe: 'response' });
  }
}


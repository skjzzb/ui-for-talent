import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


// const AUTH_API = 'http://localhost:8880/api/auth/';
const AUTH_API = 'https://authentication-api-cv.herokuapp.com/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private tokenStorageService: TokenStorageService) { }
  isLogin()
  {
    return !!this.tokenStorageService.getToken()||!!localStorage.getItem('auth_app_token');

  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      name: user.name,
      password: user.password
    }, httpOptions);
  }
  gregister(uname,nm): Observable<any> {
    return this.http.post(AUTH_API + 'gsignup', {
      username: uname,
      name: nm,

    }, httpOptions);
  }
}

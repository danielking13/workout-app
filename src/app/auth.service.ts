import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  TOKEN_KEY = 'token';

  constructor( private http: HttpClient, private router: Router) {}

  get token() {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  createUser(newUserData) {
    this.http.post<any>('http://localhost:3000/register', newUserData).subscribe(res => {
      this.saveToken(res.token);
      this.router.navigate(['dashboard']);
    });
  }

  login(loginData) {
    this.http.post<any>('http://localhost:3000/login', loginData).subscribe(res => {
      this.saveToken(res.token);
      this.router.navigate(['/dashboard']);
    });
  }

  saveToken(token) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  messages: any = [];
  userData: any;
  username: string;
  constructor( private http: HttpClient) {}

  getMessages() {
    this.http.get('http://localhost:3000/posts').subscribe(res => {
      console.log(res);
      this.messages = res;
    });
  }

  createNewUser(newUserData) {
    this.http.post('https://dev-199481.oktapreview.com/api/v1/users?activate=true', newUserData).subscribe( res => {
       this.userData = res;
      this.username = this.userData.profile.login;
      });
  }
}

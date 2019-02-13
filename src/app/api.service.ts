import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  messages:any = [];
  constructor( private http: HttpClient) {}

  getMessages() {
    this.http.get('http://localhost:3000/posts').subscribe(res => {
      console.log(res);
      this.messages = res;
    });
  }
}

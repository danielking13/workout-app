import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  messages: any = [];
  constructor( private http: HttpClient) {}

  getMessages() {
    this.http.get('http://localhost:3000/posts').subscribe(res => {
      console.log(res);
      this.messages = res;
    });
  }

  getData() {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': '3094269465c2d1bbd40ebe99a2fa422fa661b925'
    //   })
    // };
    return this.http.get('https://wger.de/api/v2/exercise/').subscribe(data => {
      console.log(data);
      // this.data = data;
    });
  }
}

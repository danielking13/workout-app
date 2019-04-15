import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': '3094269465c2d1bbd40ebe99a2fa422fa661b925'
    })
  };
  baseUrl = 'https://wger.de';
  constructor( private http: HttpClient, private router: Router) {}

  getUserData() {
    return this.http.get('http://localhost:3000/profile');
  }

  getExercises(filter1, filter2): Observable<any> {
    if(filter1 && filter2) {
      return this.http.get(this.baseUrl + '/api/v2/exercise/?status=2&language=2&ordering=id&category=' + filter2 + '&equipment=' + filter1, this.httpOptions);
    } else if(filter1) {
      return this.http.get(this.baseUrl + '/api/v2/exercise/?status=2&language=2&ordering=id' + '&equipment=' + filter1, this.httpOptions);
    } else if(filter2) {
      return this.http.get(this.baseUrl + '/api/v2/exercise/?status=2&language=2&ordering=id&category=' + filter2, this.httpOptions);
    } else {
      return this.http.get(this.baseUrl + '/api/v2/exercise/?status=2&language=2&ordering=id', this.httpOptions);
    }
  }

  getExerciseImages( filter1, filter2): Observable<any> {
    return this.http.get(this. baseUrl + '/api/v2/exerciseimage/?is_main=True&limit=200', this.httpOptions);
  }

  getMoreExercises(url): Observable<any> {
    return this.http.get(url, this.httpOptions);
  }
}

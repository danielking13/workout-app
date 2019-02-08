import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  data: any = {};

 constructor(private http: HttpClient) {
   this.getVerses();
   this.getData();
   this.displayData();
 }
 displayData() {
   console.log(this.data);
 }
 getData() {
   // const httpOptions = {
   //   headers: new HttpHeaders({
   //     'Authorization': '3094269465c2d1bbd40ebe99a2fa422fa661b925'
   //   })
   // };
   return this.http.get('https://wger.de/api/v2/exercise/');
 }

 getVerses() {
   this.getData().subscribe(data => {
     console.log(data);
     this.data = data;
   });
 }

}

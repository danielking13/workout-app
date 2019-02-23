import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

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
export class DashboardComponent implements OnInit {

    tiles: Tile[] = [
      {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
      {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
      {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
      {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    ];
    userData: any;
    age: number;
    bmi: number;
    message: string;

   constructor(private apiService: ApiService) {}

   ngOnInit() {
     // this.apiService.getData();
     this.apiService.getUserData().subscribe(res => {
       this.userData = res;
       this.getBMI(this.userData);
     });
   }

  private CalculateAge(): void {
    if(this.userData.profile.dob) {
      const birthDate = new Date(this.userData.profile.dob);
      const timeDiff = Math.abs(Date.now() - birthDate);
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
  }

  private getBMI(userData) {
     const weight = userData.profile.weight;
     const height = userData.profile.height;
     this.bmi = Number(weight*.45 / (Math.pow(height*.025, 2))).toFixed(2);

    if(this.bmi < 18.5 ) {
      this.message = 'You are in the underweight range.';
    } else if(this.bmi > 18.5 && this.bmi < 24.9) {
      this.message = 'You are in a healthy range! Great job!';
    } else if(this.bmi > 25 && this.bmi < 29.9) {
      this.message = 'You are in the overweight range.';
    } else {
      this.message = 'You are in the obese range.';
    }

  }
}

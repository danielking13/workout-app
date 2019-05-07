import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {GoogleChartInterface} from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
    userData: any;
    bmi: number;
    message: string;
    name: string;
    positiveGreeting: string;
    greetingsArray = [
      'Keep up the good work!',
      'You look great today!',
      'Pat yourself on the back. You earned it!',
      'If You Were A Box Of Crayons, You\'d Be The Giant Name-Brand One With The Built-In Sharpener',
      'You are a light in the darkness!',
      'In High School, I Bet You Were Voted “Most Likely To Keep Being Awesome"',
      'Babies And Small Animals Probably Love You',
      'You are inspiring!',
      'The road to success is dotted with many tempting parking spaces..',
      'If at first you don\'t succeed, then skydiving isn\'t for you.'
    ];
    GIFofTheDay: string;
    arrayOfGIFS = [
      '<img alt="fitness weightlifting GIF" src="https://media2.giphy.com/media/10cylTGU0KcAsE/giphy.webp?cid=790b76115cd0d605434b34324d46e076&amp;rid=giphy.webp" width="248">',
      '<img src="https://media3.giphy.com/media/3o85xunRezGKPOkcG4/giphy.gif?cid=790b76115cd0d5524b7a4c6c6f8db617&amp;rid=giphy.gif" alt="workout exercise GIF by Justin Gammon" width="248px">',
      '<img alt="exercise GIF by Petter Pentilä" height="186" src="https://media3.giphy.com/media/4bjIKBOWUnVPICCzJc/200.webp?cid=790b76115cd0d605434b34324d46e076&amp;rid=200.webp" width="300">',
      '<img alt="exercise push it GIF by Jason Clarke" height="331" src="https://media0.giphy.com/media/vF25I06jdODgA/200w.webp?cid=790b76115cd1a19a5167437855da5c2e&amp;rid=200w.webp" width="248">',
      '<img src="https://media3.giphy.com/media/14m3HcGbcy4v9m/giphy.gif?cid=790b76115cd1a19a5167437855da5c2e&amp;rid=giphy.gif" alt="exercise carrot GIF" width="300">',
      '<img src="https://media1.giphy.com/media/vuIVvW0NsWBzy/giphy.gif?cid=790b76115cd1a506522e53417732f74b&amp;rid=giphy.gif" alt="working it arnold schwarzenegger GIF" width="300">',
      '<img alt="healthy GIF" src="https://media1.giphy.com/media/q2u7LLPVWI0rm/200w.webp?cid=790b76115cd1a586756a695a59b9a4b7&amp;rid=200w.webp" width="350" height="250">'
    ];

    public barChart = {
      chartType: 'Bar',
      dataTable: [
        ['Example Total Grams: 650', 'Protein', 'Fat', 'Carbs'],
        [' ', 250, 100, 300],
      ]
    };

   constructor(private apiService: ApiService) {}

   ngOnInit() {
     this.apiService.getUserData().subscribe(res => {
       this.userData = res;
       // console.log(this.userData);
       this.name = this.userData.profile.firstName;
       this.getBMI(this.userData);
     });

     const date = new Date();
     this.positiveGreeting = this.greetingsArray[( Math.floor(Math.random() * this.greetingsArray.length))];
     this.GIFofTheDay = this.arrayOfGIFS[date.getDay()];
   }

  private getBMI(userData) {
     const weight = userData.profile.weight;
     const height = userData.profile.height;
     this.bmi = <any>(weight * .45 / (Math.pow(height * .025, 2))).toFixed(2);

    if(this.bmi < 18.5 ) {
      this.message = 'the underweight range.';
    } else if(this.bmi > 18.5 && this.bmi < 24.9) {
      this.message = 'a healthy range! Great job!';
    } else if(this.bmi > 25 && this.bmi < 29.9) {
      this.message = 'the overweight range.';
    } else {
      this.message = 'the obese range.';
    }
  }
}

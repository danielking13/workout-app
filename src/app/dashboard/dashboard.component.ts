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
    age: number;
    bmi: number = 0;
    message: string;
    // gaugeChart: GoogleChartInterface;

  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    // opt_firstRowIsData: true,
    options: {'title': 'Tasks'},
  };

  public gaugeChart: GoogleChartInterface = {
    chartType: 'Gauge',
    dataTable: [
      ['Label', 'BMI'],
      ['BMI', this.bmi]
    ],
    options: {
      animation: {easing: 'out'},
      width: 150, height: 150,
      greenFrom: 18, greenTo: 27,
      redFrom: 27, redTo: 45,
      yellowFrom: 9, yellowTo: 18,
      minorTicks: 5,
      min: 0, max: 45,
      majorTicks: ['0', '10', '18.5', '25', '30', '50'],
      greenColor: '#00cf6b'
    }
  };

  public lineChart = {
    chartType: 'LineChart',
    dataTable: [
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ],
    options: {title: 'My weight'}
  };

   constructor(private apiService: ApiService) {}

   ngOnInit() {
     // this.apiService.getData();
     this.apiService.getUserData().subscribe(res => {
       this.userData = res;
       this.getBMI(this.userData);
     });
   }

  // private CalculateAge(): void {
  //   if(this.userData.profile.dob) {
  //     const birthDate: any = new Date(this.userData.profile.dob);
  //     const timeDiff = Math.abs(Date.now() - birthDate);
  //     this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  //   }
  // }

  private getBMI(userData) {
     const weight = userData.profile.weight;
     const height = userData.profile.height;
     this.bmi = <any>(weight * .45 / (Math.pow(height * .025, 2))).toFixed(2);

    if(this.bmi < 18.5 ) {
      this.message = 'You are in the underweight range.';
    } else if(this.bmi > 18.5 && this.bmi < 24.9) {
      this.message = 'You are in a healthy range! Great job!';
    } else if(this.bmi > 25 && this.bmi < 29.9) {
      this.message = 'You are in the overweight range.';
    } else {
      this.message = 'You are in the obese range.';
    }

    const dataTable = this.gaugeChart.component.data.dataTable;
    // dataTable[1][1] = this.bmi;
    console.log(dataTable);
    console.log(this.gaugeChart.component.data);
    // this.gaugeChart.component.draw();
  }
}

import { Component, OnInit } from '@angular/core';
import {GoogleChartInterface} from 'ng2-google-charts/google-charts-interfaces';
import {FormControl, Validators} from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.less']
})
export class DietComponent implements OnInit {
  inches: number;
  weight: number;
  gender: string;
  age: number;
  formula: string;
  goal: string;
  exerciseLevel: string;
  barChart: GoogleChartInterface;
  userData: any;
  bodyFatPercent: number;

  protein: number;
  fat: number;
  carbs: number;
  showChart: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUserData().subscribe(res => {
      this.userData = res;
      this.CalculateAge();
      this.inches = this.userData.profile.height;
      this.weight = this.userData.profile.weight;
      this.gender = this.userData.profile.gender;
      this.bodyFatPercent = this.userData.profile.bodyFatPercent;
    });
  }

  private CalculateAge(): void {
    if(this.userData.profile.dob) {
      const birthDate: any = new Date(this.userData.profile.dob);
      const timeDiff = Math.abs(Date.now() - birthDate);
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
  }

  calculateMacros() {
    let restingEnergyExpenditure = 0;
    if (this.gender === 'Male')
      restingEnergyExpenditure = 10 * (this.weight * .453592) + 6.25 * (this.inches * 2.54) - 5 * this.age + 5;
    else
      restingEnergyExpenditure = 10 * (this.weight * .453592) + 6.25 * (this.inches * 2.54) - 5 * this.age - 161;

    if(this.formula === 'leanMass' && this.bodyFatPercent !== 0) {
      restingEnergyExpenditure = ((100 - this.bodyFatPercent)/100) * (this.weight * .453592);
      restingEnergyExpenditure = (restingEnergyExpenditure * 21.6) + 370;
    }

    // calculates the total calories to maintain weight based on activity level
    if(this.exerciseLevel === 'sedentary') {
      restingEnergyExpenditure *= 1.2;
    } else if(this.exerciseLevel === 'light') {
      restingEnergyExpenditure *= 1.375;
    } else if(this.exerciseLevel === 'moderate') {
      restingEnergyExpenditure *= 1.55;
    } else {
      restingEnergyExpenditure *= 1.725;
    }

    if(this.goal === 'lose') {
      restingEnergyExpenditure *= .8;
    } else if(this.goal === 'gain') {
      restingEnergyExpenditure *= 1.2;
    }

    this.protein = this.weight * .825;
    this.fat = restingEnergyExpenditure * .3 / 9;
    this.carbs = (restingEnergyExpenditure - this.protein*4 - this.fat*9) /4;

    this.barChart = {
      chartType: 'Bar',
      dataTable: [
        ['Total Grams: ' + (this.protein + this.fat + this.carbs).toFixed(0), 'Protein', 'Fat', 'Carbs'],
        [' ' , this.protein, this.fat, this.carbs]
      ],
      options: {
        chart: {
          title: 'Your Calculated Macros',
          subtitle: 'Total daily calories: ' + restingEnergyExpenditure.toFixed(0)
        }
      }
    };

    this.showChart = true;
  }
}

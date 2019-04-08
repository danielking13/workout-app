import { Component, OnInit } from '@angular/core';
import {GoogleChartInterface} from 'ng2-google-charts/google-charts-interfaces';
import {FormControl, Validators} from '@angular/forms';

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

  protein: number;
  fat: number;
  carbs: number;
  showChart: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  calculateMacros() {
    let restingEnergyExpenditure = 0;
    if (this.gender === 'male')
      restingEnergyExpenditure = 10 * (this.weight * .453592) + 6.25 * (this.inches * 2.54) - 5 * this.age + 5;
    else
      restingEnergyExpenditure = 10 * (this.weight * .453592) + 6.25 * (this.inches * 2.54) - 5 * this.age - 161;

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
        ['Total Grams', 'Protein', 'Fat', 'Carbs'],
        [(this.protein + this.fat + this.carbs), this.protein, this.fat, this.carbs]
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

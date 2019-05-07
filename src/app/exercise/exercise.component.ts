import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.less']
})
export class ExerciseComponent implements OnInit {
  exerciseList: any;
  imageList: any;
  nextList: string
  nextImageList: string;
  isGeneratedWorkout: boolean = false;
  numberOfExercises: number;
  equipment: string;
  muscleType: string;
  generatedList: any;

  /** Muscle types
   * Arms
   id: 1,11,13, 5 or category 8
   Shoulders
   id: 2 or category 13
   Legs
   id: 7, 8, 10, 15 or category 14 & 9
   Back
   id: 12, 9 or category 12
   Abs
   id: 14, 6 or category 10
   Chest
   id: 4 or category 11
   */

  constructor(private api: ApiService) { }

  ngOnInit() {}

  loadMoreExercises() {
    if(this.nextList) {
      this.api.getMoreExercises(this.nextList).subscribe(res => {
        console.log(res);
        this.exerciseList = this.exerciseList.concat(res.results);
        this.nextList = res.next;
      });
    }

    if(this.nextImageList) {
      this.api.getMoreExercises(this.nextImageList).subscribe(res => {
        this.imageList = this.exerciseList.concat(res.results);
        this.nextImageList = res.next;
      });
    }
  }

  generateWorkout() {
    this.isGeneratedWorkout = true;
    if (!(this.numberOfExercises > 0 && this.numberOfExercises < 11)) {
      this.numberOfExercises = 5;
    }
    this.generatedList = [];
    this.api.getExercises(this.equipment, this.muscleType).subscribe( res => {
      console.log(res);
      this.nextList = res.next;
      this.exerciseList = res.results;
      let copy = this.exerciseList.slice();
      for(let i = 0; i < this.numberOfExercises && i < copy.length; i++) {

        this.generatedList = this.generatedList.concat(copy.splice( Math.floor(Math.random() * copy.length), 1 ));
        console.log(this.generatedList);
      }
    });
    this.api.getExerciseImages(this.equipment, this.muscleType).subscribe(res => {
      console.log(res);
      this.imageList = res.results;
      this.nextImageList = res.next;
    });
  }

  browseWorkouts() {
    this.isGeneratedWorkout = false;
    this.api.getExercises(this.equipment, this.muscleType).subscribe( res => {
      console.log(res);
      this.nextList = res.next;
      this.exerciseList = res.results;
    });
    this.api.getExerciseImages(this.equipment, this.muscleType).subscribe(res => {
      console.log(res);
      this.imageList = res.results;
      this.nextImageList = res.next;
    });
  }
}

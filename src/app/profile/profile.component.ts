import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  userData = {
    email: String,
    password: String,
    profile: {
      firstName: String,
      lastName: String,
      height: String,
      weight: Number,
      gender: String,
      bodyFatPercent: Number
    }
  };
  canEdit = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUserData().subscribe(userData => {
      // console.log(userData);
      this.userData = userData;
    });
  }

  allowEditing() {
    this.canEdit = !this.canEdit;
  }

}

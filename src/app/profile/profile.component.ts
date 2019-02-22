import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  userData = { username: '', password: '', firstName: '', lastName: '', height: '', gender: '', dob: '', bodyFat: '', weight: '' };
  username = 'Applebottom Jean';
  canEdit = false;

  constructor() { }

  ngOnInit() {
  }

  allowEditing() {
    this.canEdit = !this.canEdit;
  }

}

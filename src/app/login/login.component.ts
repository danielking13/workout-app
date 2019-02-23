import {Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  isNewUser = false;
  loginData = { email: '', password: '' };
  feet: number = 0;
  inches: number = 0;
  newUserData = {
    email: '',
    password: '',
    profile: {
      firstName: '',
      lastName: '',
      height: '',
      weight: '',
      gender: String,
      bodyFatPercent: Number,
      dob: String
    }
  };

  constructor(private authService: AuthService) { }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' : '';
  }
  createNewUser() {
    this.isNewUser = !this.isNewUser;
  }

  login() {
    this.authService.login(this.loginData);
  }

  createAccount() {
    const totalIn = +this.feet * 12 + +this.inches;
    this.newUserData.profile.height = totalIn.toString();
    this.authService.createUser(this.newUserData);
  }

}

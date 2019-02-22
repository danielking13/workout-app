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

  newUserData = {
    email: '',
    password: '',
    profile: {
      firstName: '',
      lastName: ''
      // height: '',
      // weight: Number,
      // gender: String,
      // bodyFatPercent: Number
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
    this.authService.createUser(this.newUserData);
  }

}

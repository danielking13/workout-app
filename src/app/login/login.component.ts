import {Component, OnInit} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  isNewUser = false;
  loginData = { username: '', password: '' };

  constructor(private http: HttpClient) { }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' : '';
  }
  createNewUser() {
    this.isNewUser = !this.isNewUser;
  }

  login() {

  }

  createAccount() {

  }

  ngOnInit() {
  }

}

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
  message = '';
  data: any;

  constructor(private http: HttpClient) { }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' : '';
  }
  createNewUser() {
    this.isNewUser = !this.isNewUser;
  }

  login() {
    this.http.post('/server/api/login', this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      // this.router.navigate(['home']);
    }, err => {
      this.message = err.error.msg;
    });
  }

  createAccount() {
    this.http.post('/server/api/createAccount', this.loginData).subscribe(resp => {
      console.log(resp);
      // this.router.navigate(['login']);
    }, err => {
      this.message = err.error.msg;
    });
  }

  ngOnInit() {
  }

}

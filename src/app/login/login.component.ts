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

  newUserData = {
    login: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    mobilePhone: '',
    secondEmail: '',
  };

  message = '';
  data: any;
<<<<<<< HEAD
  isAuthenticated: boolean;
  constructor(private http: HttpClient) {}
=======

  constructor(private http: HttpClient) { }

>>>>>>> 6f31b66f5c7388e3b0322075479587a4db05a4ef

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' : '';
  }
  createNewUser() {
    this.isNewUser = !this.isNewUser;
  }

  login() {
<<<<<<< HEAD
  }

  logout() {
=======

>>>>>>> 6f31b66f5c7388e3b0322075479587a4db05a4ef
  }

  // login() {
  //   this.http.post('/server/api/login', this.loginData).subscribe(resp => {
  //     this.data = resp;
  //     localStorage.setItem('jwtToken', this.data.token);
  //     // this.router.navigate(['home']);
  //   }, err => {
  //     this.message = err.error.msg;
  //   });
  // }

  createAccount() {
<<<<<<< HEAD
    // this.http.post('https://dev-199481.oktapreview.com/api/v1/users?activate=true', this.loginData).subscribe(resp => {
    //   console.log(resp);
    //   // this.router.navigate(['login']);
    //   this.oktaAuth.loginRedirect('dashboard');
    // }, err => {
    //   this.message = err.error.msg;
    // });
  }

  ngOnInit() {
=======

>>>>>>> 6f31b66f5c7388e3b0322075479587a4db05a4ef
  }

}

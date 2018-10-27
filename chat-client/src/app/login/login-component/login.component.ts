import { Component, OnInit } from '@angular/core';
import {Token} from "../../models/token.model";
import {UserLoginService} from "../../services/user-login.service";
import {UserLogin} from "../../models/user-login.model";
import {CustomCookieService} from "../../services/custom-cookie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: Token;
  errorMessage: string;
  userLogin: UserLogin;
  successMessage: string;

  constructor(private router: Router, private loginService: UserLoginService, private cookieService: CustomCookieService) {
    console.log('Login service constructor');
  }

  ngOnInit() {
    this.userLogin = new UserLogin('', '');
    this.errorMessage = '';
    this.successMessage = '';
  }

  loginUser() {
    this.errorMessage = '';
    if(this.userLogin.username === '' || this.userLogin.password === '') {
      this.errorMessage = 'Username or Password cannot be blank';
      return false;
    }
    console.log(this.userLogin);
      this.loginService.loginUser(this.userLogin).subscribe((_token) => {
        this.token = _token;
        this.cookieService.saveCookie('token', this.token.token, 7);
        this.successMessage = 'Login Successful';
        console.log('Login successful');
        console.log(this.token);
        this.router.navigate(['chat', {}]);
      },
      _err => {
          if(_err.status == 401) {
            this.errorMessage = 'Invalid Username or password. Please try again';
          }
          else {
            this.errorMessage = 'Something went wrong while logging in,\nPlease Try Again in Sometime.';
          }
      }
     );
  }

}

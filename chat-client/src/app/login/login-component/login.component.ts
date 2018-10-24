import { Component, OnInit } from '@angular/core';
import {Token} from "../../models/token.model";
import {UserLoginService} from "../../services/user-login.service";
import {UserLogin} from "../../models/user-login.model";
import {CustomCookieService} from "../../services/custom-cookie.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: Token;
  errorMessage: String;
  userLogin: UserLogin;

  constructor(private loginService: UserLoginService, private cookieService: CustomCookieService) {
    console.log('Login service constructor');
    this.userLogin = new UserLogin('', '');
  }

  ngOnInit() {
    this.errorMessage = '';
  }

  loginUser() {
      this.loginService.loginUser(this.userLogin).subscribe((_token) => {
        this.token = _token;
        this.cookieService.saveCookie('token', this.token.token, 7);
        console.log('Login successful');
        console.log(this.token);
      },
      _err => {
          if(_err.status == 401) {
            this.errorMessage = 'Invalid Username or password. Please Try Again.';
          }
          else {
            this.errorMessage = 'Something went wrong while logging in, Please Try Again in Sometime.';
          }
      }
     );
  }

}

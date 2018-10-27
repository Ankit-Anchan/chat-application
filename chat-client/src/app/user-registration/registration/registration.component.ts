import { Component, OnInit } from '@angular/core';
import {UserLoginService} from "../../services/user-login.service";
import {UserRegistration} from "../../models/user-registration.model";
import {CustomCookieService} from "../../services/custom-cookie.service";
import {Token} from "../../models/token.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userRegistration: UserRegistration;
  confirm_password: string;
  successMessage: string;
  errorMessage: string;
  token: Token;

  constructor(private router: Router, private userService: UserLoginService, private cookieService: CustomCookieService) {
    this.userRegistration = new UserRegistration('','','','');
  }

  ngOnInit() {
  }

  registerUser() {
    this.userService.registerUser(this.userRegistration).subscribe((_token) => {
        console.log(_token);
        this.token = _token;
        this.cookieService.saveCookie('token', this.token.token, 7);
        this.successMessage = 'Login Successful';
        this.router.navigate(['chat', {}]);
    },
      _err => {
        if(_err.status == 409) {
          this.errorMessage = 'Mobile Number already exists';
        }
        else {
          this.errorMessage = 'Something went wrong while logging in,\nPlease Try Again in Sometime.';
        }
      });
  }

}

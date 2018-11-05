import { Component, OnInit } from '@angular/core';
import {Token} from '../../models/token.model';
import {UserLoginService} from '../../services/user-login.service';
import {UserLogin} from '../../models/user-login.model';
import {CustomCookieService} from '../../services/custom-cookie.service';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material';

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

  constructor(private router: Router,
              private loginService: UserLoginService,
              private cookieService: CustomCookieService,
              private snackBar: MatSnackBar) {
      const existingToken = this.cookieService.getCookie('token');
      if (existingToken && existingToken !== '') {
        this.router.navigate(['/chat', {}]);
      }
  }

  ngOnInit() {
    this.userLogin = new UserLogin('', '');
    this.errorMessage = '';
    this.successMessage = '';
  }

  loginUser() {
    this.errorMessage = '';
    if (this.userLogin.username === '' || this.userLogin.password === '') {
      this.errorMessage = 'Username or Password cannot be blank';
      this.snackBar.open(this.errorMessage, 'OK', { duration: 1000 });
      return false;
    }
    console.log(this.userLogin);
      this.loginService.loginUser(this.userLogin).subscribe((_token) => {
        this.token = _token;
        this.cookieService.saveCookie('token', this.token.token, 7);
        this.successMessage = 'Login Successful';
        this.snackBar.open(this.successMessage, 'OK', {duration: 500});
        console.log('Login successful');
        console.log(this.token);
        this.loginService.getUserInfo(this.token.token)
        .subscribe(data => {
          const userInfo = JSON.stringify(data);
          this.cookieService.saveCookie('info', userInfo, 7);
          console.log(this.cookieService.getCookie('info'));
          this.router.navigate(['chat', {}]);
        },
        err => {
          this.errorMessage = 'Something went wrong, please Login again!';
          this.snackBar.open(this.errorMessage, 'OK', { duration: 1000 });
        });
      },
      _err => {
          if (_err.status === 401) {
            this.errorMessage = 'Invalid Username or password. Please try again';
          } else {
            this.errorMessage = 'Something went wrong while logging in, Please Try Again in Sometime.';
          }
          this.snackBar.open(this.errorMessage, 'OK', { duration: 1000 });
      }
     );
  }

}

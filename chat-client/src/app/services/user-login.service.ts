import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserLogin} from '../models/user-login.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Token} from '../models/token.model';
import {UserRegistration} from '../models/user-registration.model';
import { CustomCookieService } from './custom-cookie.service';
import {DataSharingService} from './data-sharing.service';

@Injectable()
export class UserLoginService {

  private httpHeader = new HttpHeaders()
    .set('content-type', 'application/json');

  constructor(private http: HttpClient,
              private cookieService: CustomCookieService,
              private dataSharingService: DataSharingService) {
  }

  loginUser(user: UserLogin) {
    const httpBody = JSON.stringify(user);
    return this.http.post<Token>(environment.server_url + 'api/v1/auth/login', httpBody ,{ headers: this.httpHeader});
  }

  getUserInfo(token: string) {
    const httpHeader = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('x-authorization', token);
    return this.http.get(environment.server_url + 'api/v1/user/me/info' , {headers: httpHeader});
  }

  registerUser(user: UserRegistration) {
    const httpBody = JSON.stringify(user);
    return this.http.post<Token>(environment.server_url + 'api/v1/auth/user/add', httpBody, {headers: this.httpHeader});
  }

  logOut() {
    this.dataSharingService.logOut.next({});
    this.cookieService.removeCookie('token');
    this.cookieService.removeCookie('info');
    this.cookieService.removeCookie('active_chat');
  }
}

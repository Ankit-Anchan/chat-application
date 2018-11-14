import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CustomCookieService} from './custom-cookie.service';
import {Router} from '@angular/router';

@Injectable()
export class MessagingService {

  token: string;

  constructor(private router: Router, private cookieService: CustomCookieService, private http: HttpClient) {
    this.token = this.cookieService.getCookie('token');
    if (!this.token || this.token === '') {
      this.router.navigate(['/login']);
    }
  }

  searchUser(searchString: string) {
    const httpBody = {
      searchString: searchString
    };
    console.log('token = ' + this.token);
    const httpHeader = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('x-authorization', this.token);
    console.log(httpHeader);
    return this.http.post(environment.server_url + 'api/v1/user/search', httpBody, {headers: httpHeader});
  }

  getFriendList() {
    const httpHeader = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('x-authorization', this.token);
    return this.http.get(environment.server_url + 'api/v1/contact/list', {headers: httpHeader});
  }

  sendFriendRequest(_id: string) {
    const header = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('x-authorization', this.token);
    const httpBody = {
        sent_to: _id
      };
      console.log('token = ' + this.token);
    return this.http.post(environment.server_url + 'api/v1/contact/request/send', httpBody, {headers: header});
  }

  getMessageList(sent_to: string) {
    const header = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('x-authorization', this.token);
      return this.http.get(environment.server_url + 'api/v1/message/list/' + sent_to,{headers: header});
  }
}

import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import * as moment from 'moment';

@Injectable()
export class CustomCookieService {

  constructor(private cookieService: CookieService) {
  }

  saveCookie(key, value, day) {

    if (day > 0) {

      const date = moment().add(day, 'days');

      this.cookieService.set(key, JSON.stringify(value), date.toDate(), '/');

    } else {

      this.cookieService.set(key, JSON.stringify(value), 7, '/');

    }

  }

  getCookie(key) {
    const val = this.cookieService.get(key);
    if (val === '' || !val) {
      return '';
    } else {
      return JSON.parse(this.cookieService.get(key));
    }
  }

  removeCookie(key) {
    this.cookieService.delete(key, '/');
  }

  removeAllCookie() {
    this.cookieService.deleteAll('/');
  }

}

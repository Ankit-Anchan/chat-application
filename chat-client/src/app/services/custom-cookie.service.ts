import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import * as moment from 'moment';

@Injectable()
export class CustomCookieService {

  constructor(private cookieService: CookieService) {
  }

  saveCookie(key, value, day) {

    if (day > 0) {

      const date = moment().add(day, 'days');

      this.cookieService.put(key, JSON.stringify(value), {expires: date.toDate()});

    } else {

      this.cookieService.put(key, JSON.stringify(value));

    }

  }

  getCookie(key) {
    const val = this.cookieService.get(key);
    if (val === '' || val === undefined) {
      return '';
    } else {
      return JSON.parse(this.cookieService.get(key));
    }
  }

  removeCookie(key) {
    this.cookieService.remove(key);
  }

  removeAllCookie() {
    this.cookieService.removeAll();
  }

}

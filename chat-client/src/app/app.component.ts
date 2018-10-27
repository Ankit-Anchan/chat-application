import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CustomCookieService} from "./services/custom-cookie.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private cookieService: CustomCookieService) {
    console.log('App component constructor');
    if(this.cookieService.getCookie('token') && this.cookieService.getCookie('token') !== '') {
      this.router.navigate(['chat', {}]);
    }
    else {
      this.router.navigate(['home', {}]);
    }
  }
}

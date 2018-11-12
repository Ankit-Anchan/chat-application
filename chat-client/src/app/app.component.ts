import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {CustomCookieService} from './services/custom-cookie.service';
import {DataSharingService} from './services/data-sharing.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private cookieService: CustomCookieService,
    private dataSharingService: DataSharingService) {
    console.log('App component constructor');
    if (this.cookieService.getCookie('token') && this.cookieService.getCookie('token') !== '') {
      this.router.navigate(['chat', {}]);
    } else {
      this.router.navigate(['home', {}]);
    }
    this.dataSharingService.showSnackBar.subscribe(_data => {
      this.snackBar.open(_data.message, _data.action, {duration: 3000});
    });
  }
}

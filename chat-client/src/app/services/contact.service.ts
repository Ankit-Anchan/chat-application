import { Injectable } from '@angular/core';
import { CustomCookieService } from './custom-cookie.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class ContactService {
    token: string;

    constructor(private http: HttpClient, private cookieService: CustomCookieService, private router: Router) {
        this.token = this.cookieService.getCookie('token');
        if (!this.token || this.token === '') {
            this.router.navigate(['/login', {}]);
        }
    }

    getPendingRequestList() {
        const httpHeader = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('x-authorization', this.token);
        return this.http.get(environment.server_url + 'api/v1/contact/request/pending', {headers: httpHeader});
    }

    acceptFriendRequest(_id: string) {
        const httpHeader = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('x-authorization', this.token);
        return this.http.post(environment.server_url + 'api/v1/contact/request/accept/' + _id, {}, {headers: httpHeader});
    }

    declineFriendRequest(_id: string) {
        const httpHeader = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('x-authorization', this.token);
        return this.http.post(environment.server_url + 'api/v1/contact/request/decline/' + _id, {}, {headers: httpHeader});
    }
}

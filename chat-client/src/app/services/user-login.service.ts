import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserLogin} from "../models/user-login.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Token} from "../models/token.model";

@Injectable()
export class UserLoginService {

  private httpHeader = new HttpHeaders()
    .set('content-type', 'application/json');

  constructor(private router: Router, private http: HttpClient) {
    // if(this.cookieService.getCookie('user-info')) {
    //   this.router.navigate(['/chat', {}]);
    // }
  }

  loginUser(user: UserLogin) {
    const httpBody = JSON.stringify(user);
    return this.http.post<Token>(environment.server_url + 'api/v1/auth/login', httpBody ,{headers: this.httpHeader});
  }

}

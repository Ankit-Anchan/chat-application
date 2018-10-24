import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './route';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./shared/shared.module";
import {FormsModule} from "@angular/forms";
import {CustomCookieService} from "./services/custom-cookie.service";
import {UserLoginService} from "./services/user-login.service";
import {CookieModule} from "ngx-cookie";
import {HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./login/login.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [UserLoginService, CustomCookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

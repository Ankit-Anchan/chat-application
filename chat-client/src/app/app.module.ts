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
import {MessagingService} from './services/messaging.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
  providers: [UserLoginService, CustomCookieService, MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }

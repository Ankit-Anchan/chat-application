import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './route';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {FormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {CustomCookieService} from './services/custom-cookie.service';
import {UserLoginService} from './services/user-login.service';
import {HttpClientModule} from '@angular/common/http';
import {MessagingService} from './services/messaging.service';
import { HomeComponent } from './home/home.component';
import { ContactService } from './services/contact.service';
import { DataSharingService } from './services/data-sharing.service';
import { SocketService } from './services/socket.service';

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
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [SocketService, UserLoginService, CookieService, CustomCookieService, MessagingService, ContactService, DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }

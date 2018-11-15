import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  {
    path: '', component: AppComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'register',
    loadChildren: '../app/user-registration/user-registration.module#UserRegistrationModule'
  },
  {
    path: 'login',
    loadChildren: '../app/login/login.module#LoginModule'
  },
  {
    path: 'chat',
    loadChildren: '../app/chat/chat.module#ChatModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

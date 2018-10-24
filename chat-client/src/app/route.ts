import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";

const appRoutes: Routes = [
  {
    path: '', component: AppComponent
  },
  {
    path: 'login', loadChildren: '../app/login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

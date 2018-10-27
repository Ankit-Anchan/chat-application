import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{
    path: '',
    component: RegistrationComponent,
    pathMatch: 'prefix'
}];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule
  ],
  declarations: [RegistrationComponent]
})
export class UserRegistrationModule { }

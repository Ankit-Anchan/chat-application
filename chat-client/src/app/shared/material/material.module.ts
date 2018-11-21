import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule, MatGridListModule,
  MatProgressSpinnerModule, MatSnackBarModule, MatTabsModule, MatBottomSheetModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
  ],
  exports: [
    MyNavComponent,
    CommonModule,
    LayoutModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatBottomSheetModule
  ],
  declarations: [MyNavComponent]
})
export class MaterialModule { }

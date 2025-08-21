import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';



@NgModule({
  declarations: [AuthLayoutComponent,BlankLayoutComponent],
  imports: [
    CommonModule,
     RouterModule,
    SharedModule

  ]
})
export class CoreModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliceTextPipe } from 'src/app/shared/pipes/slice-text.pipe';
import { WishListComponent } from './wish-list/wish-list.component';
import { TranslatePipe } from '@ngx-translate/core';

const routes: Routes = [{ path: '', component: WishListComponent }];

@NgModule({
  declarations: [WishListComponent, SliceTextPipe],
  imports: [CommonModule, RouterModule.forChild(routes), TranslatePipe],
  exports: [RouterModule],
})
export class WishListModule {}

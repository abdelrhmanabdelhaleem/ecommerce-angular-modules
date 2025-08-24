import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { WishListComponent } from './wish-list/wish-list.component';

const routes: Routes = [{ path: '', component: WishListComponent }];

@NgModule({
  declarations: [WishListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslatePipe,
    SharedModule,
  ],
  exports: [RouterModule],
})
export class WishListModule {}

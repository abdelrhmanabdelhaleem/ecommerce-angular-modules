import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
const routes: Routes = [{ path: '', component: ProductDetailsComponent }];
@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TranslatePipe,
  ],
  exports: [RouterModule],
})
export class ProductDetailsModule {}

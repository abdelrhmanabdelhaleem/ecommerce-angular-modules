import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [{ path: '', component: OrdersComponent }];

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TranslatePipe],
  exports: [RouterModule],
})
export class OrdersModule {}

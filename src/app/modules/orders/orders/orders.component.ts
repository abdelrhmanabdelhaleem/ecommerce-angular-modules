import { Component } from '@angular/core';
import { OrdersService } from 'src/app/core/services/orders.service';
import { IOrderItem } from 'src/app/shared/models/icart';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SecurityService } from 'src/app/shared/services/security.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  constructor(
    private securityService: SecurityService,
    private _ordersService: OrdersService,
    public loading: LoadingService
  ) {}
  ordersItems: IOrderItem[] | null = null;

  ngOnInit(): void {
    if (this.securityService.isLogged()) {
      const userId = this.securityService.getUserData()?.id;
      this._ordersService.getOrders(userId).subscribe({
        next: (response) => {
          console.log('Orders:', response);
          this.ordersItems = response;
        },
      });
    }
  }
}

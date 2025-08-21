import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/shared/environment/environment';
import { IShippingData } from 'src/app/shared/models/ishipping-data';
import { ICheckoutRes } from './../../shared/models/icheckout-res';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private _http: HttpClient) {}
  CreateCashOrder(shippingData: IShippingData, cartId: string | null) {
    return this._http.post(`${environment.pathUrl}/orders/${cartId}`, {
      shippingAddress: shippingData,
    });
  }
  CreateOnlineOrder(
    shippingData: IShippingData,
    cartId: string | null,
    redirectUrl: string
  ): Observable<ICheckoutRes> {
    return this._http.post<ICheckoutRes>(
      `${environment.pathUrl}/orders/checkout-session/${cartId}?url=${redirectUrl}`,
      { shippingAddress: shippingData }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/shared/environment/environment';
import { IOrderItem } from 'src/app/shared/models/icart';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private _http: HttpClient) {}

  getOrders(userId: string | undefined): Observable<IOrderItem[]> {
    return this._http.get<IOrderItem[]>(
      `${environment.pathUrl}/orders/user/${userId}`
    );
  }
}

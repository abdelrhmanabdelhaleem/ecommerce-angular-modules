import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart, IclearCartRes } from '../models/icart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _http: HttpClient) {}
  countCart$: BehaviorSubject<number> = new BehaviorSubject(0);
  addToCart(productId: string | null): Observable<ICart> {
    return this._http.post<ICart>(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { productId }
    );
  }
  removeFromCart(productId: string | null): Observable<ICart> {
    return this._http.delete<ICart>(`${environment.pathUrl}/cart/${productId}`);
  }
  getCart(): Observable<ICart> {
    return this._http.get<ICart>(`${environment.pathUrl}/cart`);
  }
  clearCart(): Observable<IclearCartRes> {
    return this._http.delete<IclearCartRes>(`${environment.pathUrl}/cart`);
  }
  updateCart(productId: string | null, count: number): Observable<ICart> {
    return this._http.put<ICart>(`${environment.pathUrl}/cart/${productId}`, {
      count,
    });
  }
}

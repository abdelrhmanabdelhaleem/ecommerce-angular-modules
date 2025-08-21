import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { IWishlistActionRes } from '../models/wishList/iwishlist-action-res';
import { IWishlistItemsRes } from '../models/wishList/iwishlist-items-res';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private readonly _http: HttpClient) {}
  wishListIdS: string[] = [];
  addToWishList(productId: string | null): Observable<IWishlistActionRes> {
    return this._http.post<IWishlistActionRes>(
      `${environment.pathUrl}/wishlist`,
      { productId }
    );
  }
  removeFromWishList(productId: string | null): Observable<IWishlistActionRes> {
    return this._http.delete<IWishlistActionRes>(
      `${environment.pathUrl}/wishlist/${productId}`
    );
  }
  getWishList(): Observable<IWishlistItemsRes> {
    return this._http.get<IWishlistItemsRes>(`${environment.pathUrl}/wishlist`);
  }
  isInWishList(productId: string | null): boolean {
    // console.log('🚀 ~ WishListService ~ isInWishList ~ productId:', productId);

    return this.wishListIdS.includes(productId!);
  }
}

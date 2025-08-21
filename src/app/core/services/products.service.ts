import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/shared/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}
  getProducts(): Observable<any> {
    return this._http.get(`${environment.pathUrl}/products`);
  }

  getProductById(id: string | null): Observable<any> {
    return this._http.get(`${environment.pathUrl}/products/${id}`);
  }
}

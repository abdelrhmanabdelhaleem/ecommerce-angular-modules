import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { IProduct } from 'src/app/shared/models/iproduct';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  // product!: IProduct;
  productId: string | null = null;
  product$!: Observable<IProduct>;

  constructor(private productsService: ProductsService) {}
  activatedRoute = inject(ActivatedRoute);
  getProductDetails(productId: string) {
    this.product$ = this.productsService.getProductById(productId).pipe(
      map((product: any) => {
        return product.data;
      })
    );
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (params) => (this.productId = params.get('id'))
    );
    if (this.productId) {
      this.getProductDetails(this.productId);
    }
  }
}

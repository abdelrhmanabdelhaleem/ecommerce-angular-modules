import { CartService } from './../../services/cart.service';
import { Component, Input, inject } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  cartService = inject(CartService);
  toastrService = inject(ToastrService);
  addToCart(productId: string | null) {
    this.cartService.addToCart(productId).subscribe((res) => {
      this.cartService.countCart$.next(res.numOfCartItems);
      this.toastrService.success('Product added to cart successfully');
    });
  }
}

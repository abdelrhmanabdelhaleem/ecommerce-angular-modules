import { Component, Input, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../models/iproduct';
import { WishListService } from '../../services/wish-list.service';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  cartService = inject(CartService);
  toastrService = inject(ToastrService);
  wishListService = inject(WishListService);
  addToCart(productId: string | null) {
    this.cartService.addToCart(productId).subscribe((res) => {
      this.cartService.countCart$.next(res.numOfCartItems);
      this.toastrService.success('Product added to cart successfully');
    });
  }
  addToWishList(productId: string | null) {
    this.wishListService.addToWishList(productId).subscribe((res) => {
      // this.cartService.countCart$.next(res.numOfCartItems);
      this.wishListService.wishListIdS = res.data;
      this.toastrService.success('Product added to wishlist successfully');
    });
  }
  removeFromWishList(productId: string | null) {
    this.wishListService.removeFromWishList(productId).subscribe((res) => {
      // this.cartService.countCart$.next(res.numOfCartItems);
      this.wishListService.wishListIdS = res.data;
      this.toastrService.success('Product removed from wishlist successfully');
    });
  }
}

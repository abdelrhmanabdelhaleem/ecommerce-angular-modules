import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { Component, inject } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { ICart } from 'src/app/shared/models/icart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(
    private cartService: CartService,
    private toastrService: ToastrService,
    public loading: LoadingService
  ) {}
  cartItems: ICart | null = null;
  ngOnInit(): void {
    this.getCartItems();
  }
  getCartItems() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartItems = res;
        this.cartService.countCart$.next(res.numOfCartItems);
      },
    });
  }
  removeFromCart(productId: string | null) {
    this.cartService.removeFromCart(productId).subscribe({
      next: (res) => {
        this.cartItems = res;
        this.toastrService.success('Product removed from cart successfully');
        this.cartService.countCart$.next(res.numOfCartItems);
      },
    });
  }
  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        this.toastrService.success('Cart cleared successfully');
        this.cartItems = null;
        this.cartService.countCart$.next(0);
      },
    });
  }
  upDateCart(productId: string | null, count: number) {
    if (count > 0) {
      this.cartService.updateCart(productId, count).subscribe({
        next: (res) => {
          this.toastrService.success('Cart updated successfully');
          this.cartService.countCart$.next(res.numOfCartItems);
          this.cartItems = res;
        },
      });
    }
  }
}

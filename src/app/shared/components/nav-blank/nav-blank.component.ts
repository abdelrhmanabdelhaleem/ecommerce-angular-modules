import { Component } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translation.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from '../../services/cart.service';
import { WishListService } from '../../services/wish-list.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss'],
})
export class NavBlankComponent {
  constructor(
    public authService: AuthService,
    public cartService: CartService,
    public translationService: TranslationService,
    public wishListService: WishListService
  ) {}
  ngOnInit(): void {
    this.getCartItems();
    this.getWishList();
  }
  getCartItems() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartService.countCart$.next(res.numOfCartItems);
      },
    });
  }
  getWishList() {
    return this.wishListService.getWishList().subscribe((res) => {
      this.wishListService.wishListIdS = res.data.map((item) => item._id);
    });
  }
}

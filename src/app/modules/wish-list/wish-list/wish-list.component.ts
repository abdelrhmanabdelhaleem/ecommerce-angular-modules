import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';
import { IWishlistItemsRes } from './../../../shared/models/wishList/iwishlist-items-res';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent {
  wishListService = inject(WishListService);
  toastrService = inject(ToastrService);
  loading = inject(LoadingService);

  wishListItems: IWishlistItemsRes = {} as IWishlistItemsRes;
  ngOnInit(): void {
    this.getWishList();
  }
  getWishList() {
    return this.wishListService.getWishList().subscribe((res) => {
      this.wishListService.wishListIdS = res.data.map((item) => item._id);
      this.wishListItems = res;
      console.log(
        '🚀 ~ WishListComponent ~ getWishList ~ res:',
        this.wishListService.wishListIdS.length
      );
      console.log(
        '🚀 ~ WishListComponent ~ getWishList ~ res:',
        this.wishListItems.count
      );
    });
  }

  removeFromWishList(productId: string | null) {
    this.wishListService.removeFromWishList(productId).subscribe((res) => {
      // this.cartService.countCart$.next(res.numOfCartItems);
      this.getWishList();
      this.toastrService.success('Product removed from wishlist successfully');
      this.wishListService.wishListIdS = res.data;
    });
  }
}

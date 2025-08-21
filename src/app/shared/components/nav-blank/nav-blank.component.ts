import { AuthService } from 'src/app/shared/services/auth.service';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { TranslationService } from 'src/app/core/services/translation.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss'],
})
export class NavBlankComponent {
  constructor(
    public authService: AuthService,
    public cartService: CartService,
    public translationService: TranslationService
  ) {}
  ngOnInit(): void {
    this.getCartItems();
  }
  getCartItems() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartService.countCart$.next(res.numOfCartItems);
      },
    });
  }
}

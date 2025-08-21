import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IProduct } from '../../models/iproduct';
import { ProductsService } from './../../../core/services/products.service';
import {
  Component,
  DestroyRef,
  inject,
  Input,
  SimpleChanges,
} from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: IProduct[] = [];
  displayProducts: IProduct[] = [];
  searchTerm: string = '';
  @Input() showLimited: boolean = false;
  constructor(
    private productsService: ProductsService,
    public loading: LoadingService
  ) {}
  destroyRef = inject(DestroyRef);

  setDisplayProducts(showLimited: boolean) {
    this.displayProducts = showLimited
      ? this.products.slice(20, 32)
      : [...this.products];
  }
  ngOnInit(): void {
    this.productsService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.products = data.data;
        this.setDisplayProducts(this.showLimited);
      });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['showLimited']) {
      this.setDisplayProducts(this.showLimited);
    }
  }
}

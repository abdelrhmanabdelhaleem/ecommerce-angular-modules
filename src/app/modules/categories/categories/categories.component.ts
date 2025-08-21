import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ICategory } from 'src/app/shared/models/icategory';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories: ICategory[] = [];
  constructor(
    private categoriesService: CategoriesService,
    public loading: LoadingService
  ) {}
  destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.categories = data.data;
        console.log(this.categories);
      });
  }
}

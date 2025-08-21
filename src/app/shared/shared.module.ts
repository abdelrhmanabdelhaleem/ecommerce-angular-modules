import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SearchPipe } from './pipes/search.pipe';
import { SliceTextPipe } from './pipes/slice-text.pipe';

@NgModule({
  declarations: [
    NavBlankComponent,
    NavAuthComponent,
    NotfoundComponent,
    ProductListComponent,
    ProductCardComponent,
    CategoryCardComponent,
    SearchPipe,
    SliceTextPipe,
  ],
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
  exports: [
    NavBlankComponent,
    NavAuthComponent,
    NotfoundComponent,
    ProductListComponent,
    CategoryCardComponent,
    SliceTextPipe,
  ],
})
export class SharedModule {}

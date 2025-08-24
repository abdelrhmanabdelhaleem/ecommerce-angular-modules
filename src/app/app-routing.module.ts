import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [loggedGuard],
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,

    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },

      {
        path: 'categories',
        loadChildren: () =>
          import('./modules/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'product/:id',
        loadChildren: () =>
          import('./modules/product-details/product-details.module').then(
            (m) => m.ProductDetailsModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./modules/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'checkout/:id',
        loadChildren: () =>
          import('./modules/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
      },
      {
        path: 'allorders',
        loadChildren: () =>
          import('./modules/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'wishList',
        loadChildren: () =>
          import('./modules/wish-list/wish-list.module').then(
            (m) => m.WishListModule
          ),
      },
    ],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategorySliderComponent } from './components/category-slider/category-slider.component';
import { HomeComponent } from './components/home/home.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];
@NgModule({
  declarations: [HomeComponent, MainSliderComponent, CategorySliderComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslatePipe,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class HomeModule {}

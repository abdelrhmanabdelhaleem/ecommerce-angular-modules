import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategorySliderComponent } from './components/category-slider/category-slider.component';
import { HomeComponent } from './components/home/home.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';

@NgModule({
  declarations: [HomeComponent, MainSliderComponent, CategorySliderComponent],
  imports: [CommonModule, SharedModule, TranslatePipe],
})
export class HomeModule {}

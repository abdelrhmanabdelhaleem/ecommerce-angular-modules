import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: IProduct[], text: string): IProduct[] {
    return products.filter((product: IProduct) =>
      product.title.toLowerCase().includes(text.toLowerCase())
    );
  }
}

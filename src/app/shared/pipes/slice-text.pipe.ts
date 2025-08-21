import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText',
})
export class SliceTextPipe implements PipeTransform {
  transform(title: string): string {
    return title.split(' ').slice(0, 2).join(' ');
  }
}

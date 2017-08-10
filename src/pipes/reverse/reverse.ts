import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {

  transform(value: any, ...args) {
    if (value) {
      return value.slice().reverse();
    }
    return null;
  }
}

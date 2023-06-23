import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMiles'
})
export class FormatMilesPipe implements PipeTransform {

  transform(value: number): string {
    const miles = value.toLocaleString() + ' miles';
    const kilometers = (value * 1.60934).toLocaleString() + ' km';

    return `${miles} (${kilometers})`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercase'
})
export class UppercasePipe implements PipeTransform {

  transform(value: string, prefix?: string, suffix?: string): string {
    return (prefix ?? '') + value.toUpperCase() + (suffix ?? '');
  }

}

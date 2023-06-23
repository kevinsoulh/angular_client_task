import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatRegNum'
})
export class FormatRegNumPipe implements PipeTransform {

  transform(value: string): string {

    if (value && value.length >= 3) {
      const part1 = value.substring(0, 3);
      const part2 = value.substring(3, 5);
      const part3 = value.substring(5);

      return `${part1} ${part2} ${part3}`;
    }

    return value;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rangeSize',
})
export class RangeSizePipe implements PipeTransform {
  transform(value: number): number[] {
    return value || value === 0
      ? Array(value)
          ?.fill(0)
          ?.map((x, i) => i)
      : undefined;
  }
}

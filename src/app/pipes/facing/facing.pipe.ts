import { Pipe, PipeTransform } from '@angular/core';

import { FacingEnum } from '../../models';

@Pipe({
  name: 'facing',
})
export class FacingPipe implements PipeTransform {
  transform(value: FacingEnum): string {
    switch (value) {
      case FacingEnum.NORTH: {
        return 'NORTH';
      }
      case FacingEnum.EAST: {
        return 'EAST';
      }
      case FacingEnum.SOUTH: {
        return 'SOUTH';
      }
      case FacingEnum.WEST: {
        return 'WEST';
      }
      default: {
        return '';
      }
    }
  }
}

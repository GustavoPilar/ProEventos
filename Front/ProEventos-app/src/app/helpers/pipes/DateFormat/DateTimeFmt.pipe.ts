import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { Constants } from '@app/util/constants';


@Pipe({
  name: 'DateTimeFmtPipe',
  standalone: true
})
export class DateTimeFmtPipe extends DatePipe implements PipeTransform {

  override transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_TIME);
  }

}

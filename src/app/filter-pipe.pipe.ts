import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  pure: false
})
export class FilterPipePipe implements PipeTransform {

  transform(items: any[], filter: any, propertyToCheck: string): any {
    if (!items || !filter) {
      return items;
    }
    
    return items.filter(item => item[propertyToCheck].indexOf(filter) !== -1);
  }

}

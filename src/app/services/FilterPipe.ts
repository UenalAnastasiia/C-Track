import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  public transform(value: any[], filterText: string) {
    return filterText.length > 0 ? value.filter(x =>
      x.name.toLowerCase().includes(filterText.toLowerCase()) ||
      x.symbol.toLowerCase().includes(filterText.toLowerCase())) : value
  }
}
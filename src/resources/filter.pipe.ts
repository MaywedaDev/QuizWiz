import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tests: any[], name: any): any[] {
    if(name === undefined){
      return tests
    }
    return tests.filter((test: any) => {
      return test.name.toLowerCase().includes(name.toLowerCase());
    })
  }

}

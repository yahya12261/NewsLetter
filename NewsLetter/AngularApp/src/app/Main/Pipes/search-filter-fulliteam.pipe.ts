import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return null;
    // if (!args[0]) return value;
    if (!args[1] && !args[0]) return value;
    if (!args[0]) return value;
    if (args[0] == -1 && !args[0]) return value;
    args[0] = args[0].toLowerCase();

    return value.filter(function (Post: any) {
      if (args[1] == -1) {
        return JSON.stringify(Post).toLocaleLowerCase().includes(args[0]);
      } else {
        return args[1] == Post.personInfo.id;
      }
    });
  }
}

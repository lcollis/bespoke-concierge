import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toLocalTime'
})

export class ToLocalTimePipe implements PipeTransform {
    transform(value: string): Date {
        if (value) {
            var date = new Date(value);
            var localOffset = new Date().getTimezoneOffset() * 60000;
            var newDate = new Date(date.getTime() - localOffset);
            return newDate;
        }
    }
}

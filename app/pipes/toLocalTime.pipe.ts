import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toLocalTime'
})

export class ToLocalTimePipe implements PipeTransform {
    transform(value: string) {
        if (value) {
            var date = new Date(value);
            var localOffset = new Date().getTimezoneOffset() * 60000;
            console.log("local offset: " + localOffset);
            var newDate = new Date(date.getTime() - localOffset);
            console.log("old date: " + date + "\nnewDate: " + newDate);
            return newDate;
        }
    }
}
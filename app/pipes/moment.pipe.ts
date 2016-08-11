import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'moment'
})

export class MomentPipe implements PipeTransform {
    transform(value: Date, args: string): any {
        console.log("moment got: " + value);
        return moment(value).format(args);
    }
}
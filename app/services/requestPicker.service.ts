import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class RequestPickerService {

    requestDetails: RequestDetails;
}

export class RequestDetails {
    title: string;

    hasDate: boolean;
    dateLabel: string;
    hasTime: boolean;
    timeLabel: string;
    hasText: boolean;
    textLabel: string;
   
   static getTaskLongDescription(requestDetails: RequestDetails, guestID: string, text: string, date: Date, time: Date): string {
       var description: string;
       description = requestDetails.title + " for guest: " + guestID;

       if(requestDetails.hasDate) {
           description += "\nDate: " + moment(date).format("MMM Do");
       }

       if(requestDetails.hasTime) {
           description += "\nTime: " + moment(time).format("h:mm a");
       }

       if(requestDetails.hasText) {
           description += "\nDetails: " + text;
       }

       return description;
   }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { RequestPickerService, RequestDetails } from "../../services/requestPicker.service";

@Component({
    selector: 'makeRequests',
    templateUrl: 'pages/makeRequests/makeRequests.html',
    styleUrls: ['pages/makeRequests/makeRequests.css']
})
export class MakeRequestsComponent {

    requests: RequestDetails[] = [
        {
            title: "Any request",
            hasDate: false,
            dateLabel: "",
            hasTime: false,
            timeLabel: "",
            hasText: true,
            textLabel: "What can we do for you?"
        },
        {
            title: "Forgotten items",
            hasDate: false,
            dateLabel: "",
            hasTime: false,
            timeLabel: "",
            hasText: true,
            textLabel: "What can we get for you?"
        },
        {
            title: "Wake up call",
            hasDate: false,
            dateLabel: "",
            hasTime: true,
            timeLabel: "Time we should call you: ",
            hasText: true,
            textLabel: "Any special details?"
        },
        {
            title: "Transportation",
            hasDate: true,
            dateLabel: "Day needed: ",
            hasTime: true,
            timeLabel: "time needed: ",
            hasText: true,
            textLabel: "Where would you like to go?"
        },
        {
            //DONT CHANGE THIS TITLE. The itinerary uses the title to pull dinner reservations into the itinerary
            title: "Dinner reservation",
            hasDate: true,
            dateLabel: "Day of reservation: ",
            hasTime: true,
            timeLabel: "Time of reservation: ",
            hasText: true,
            textLabel: "Details: "
        }
    ];

    constructor(private _router: Router, private _requestPickerService: RequestPickerService) {}

    onItemTap(args) {
        var selectedRequest: RequestDetails = this.requests[args.index];
        this._requestPickerService.requestDetails = selectedRequest;
        this._router.navigate(["/RequestDetails"]);
    }
}
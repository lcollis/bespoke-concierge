import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { RequestPickerService, RequestDetails } from "../../services/requestPicker.service";

@Component({
    selector: 'tidyUp',
    templateUrl: 'pages/tidyUp/tidyUp.html',
    styleUrls: ['pages/tidyUp/tidyUp.css']
})
export class TidyUpComponent {

    requests: RequestDetails[] = [
        {
            title: "Make up room",
            hasDate: false,
            dateLabel: "",
            hasTime: true,
            timeLabel: "Time: ",
            hasText: true,
            textLabel: "Details (optional): "
        },
        {
            title: "Evening turn down service",
            hasDate: true,
            dateLabel: "Date: ",
            hasTime: true,
            timeLabel: "Time: ",
            hasText: true,
            textLabel: "Details (optional): "
        },
        {
            title: "Other request",
            hasDate: false,
            dateLabel: "",
            hasTime: false,
            timeLabel: "",
            hasText: true,
            textLabel: "Details: "
        }];

    constructor(private _router: Router, private _requestPickerService: RequestPickerService) { }

    onItemTap(args) {
        var selectedRequest: RequestDetails = this.requests[args.index];
        this._requestPickerService.requestDetails = selectedRequest;
        this._router.navigate(["/GuestScreen/RequestDetails"]);
    }
}
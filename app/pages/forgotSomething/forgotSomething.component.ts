import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { RequestPickerService, RequestDetails } from "../../services/requestPicker.service";

@Component({
    selector: 'forgotSomething',
    templateUrl: 'pages/forgotSomething/forgotSomething.html',
    styleUrls: ['pages/forgotSomething/forgotSomething.css']
})
export class ForgotSomethingComponent {

    requests: RequestDetails[] = [
        {
            title: "Toothbrush",
            hasDate: false,
            dateLabel: "",
            hasTime: false,
            timeLabel: "",
            hasText: true,
            textLabel: "Details (optional): "
        },
        {
            title: "Toothpaste",
            hasDate: false,
            dateLabel: "",
            hasTime: false,
            timeLabel: "",
            hasText: true,
            textLabel: "Details (optional): "
        },
        {
            title: "Phone Charger",
            hasDate: false,
            dateLabel: "",
            hasTime: false,
            timeLabel: "",
            hasText: true,
            textLabel: "Charger plug type: "
        },
    ];

    constructor(private _router: Router, private _requestPickerService: RequestPickerService) {}

    onItemTap(args) {
        var selectedRequest: RequestDetails = this.requests[args.index];
        this._requestPickerService.requestDetails = selectedRequest;
        this._router.navigate(["/GuestScreen/RequestDetails"]);
    }
}
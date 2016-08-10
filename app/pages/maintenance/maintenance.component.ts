import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { RequestPickerService, RequestDetails } from "../../services/requestPicker.service";

@Component({
    selector: 'maintenance',
    templateUrl: 'pages/maintenance/maintenance.html',
    styleUrls: ['pages/maintenance/maintenance.css']
})
export class MaintenanceComponent {

    requests: RequestDetails[] = [
        {
            title: "Toilet not working",
            hasDate: false,
            dateLabel: "",
            hasTime: false,
            timeLabel: "",
            hasText: true,
            textLabel: "Details (optional): "
        },
        {
            title: "Heating not working",
            hasDate: false,
            dateLabel: "",
            hasTime: false,
            timeLabel: "",
            hasText: true,
            textLabel: "Details (optional): "
        },
        {
            title: "Cooling not working",
            hasDate: false,
            dateLabel: "",
            hasTime: false,
            timeLabel: "",
            hasText: true,
            textLabel: "Details (optional): "
        },
        {
            title: "TV not working",
            hasDate: false,
            dateLabel: "",
            hasTime: false,
            timeLabel: "",
            hasText: true,
            textLabel: "Details (optional): "
        },
        {
            title: "Internet not working",
            hasDate: false,
            dateLabel: "",
            hasTime: false,
            timeLabel: "",
            hasText: true,
            textLabel: "Details (optional): "
        }];

    constructor(private _router: Router, private _requestPickerService: RequestPickerService) { }

    onItemTap(args) {
        var selectedRequest: RequestDetails = this.requests[args.index];
        this._requestPickerService.requestDetails = selectedRequest;
        this._router.navigate(["/GuestScreen/RequestDetails"]);
    }
}
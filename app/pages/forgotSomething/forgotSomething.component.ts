import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { RequestPickerService, RequestDetails } from "../../services/requestPicker.service";
import { TaskService } from "../../services/taskServices/task.service";
import { UserIdService } from "../../services/userId.service";
import { Task } from "../../services/taskServices/task";
import { TextService } from "../../services/text.service";

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
        null //null to have the list view show the made requests
    ];

    loading: boolean = true;
    madeRequests: Task[];

    constructor(private _router: Router, private _requestPickerService: RequestPickerService, private _taskService: TaskService, private _userIdService: UserIdService, private _textService: TextService) {
        this._userIdService.getUserId().then((userID: string) => {
            this._taskService.getTasks(parseInt(userID)).subscribe((response) => {
                this.madeRequests = response.filter((madeRequest) => {
                    var shortDescription = madeRequest.ShortDescription;
                    var match = false;
                    this.requests.forEach((request) => {
                        if (request) {
                            if (request.title === shortDescription) {
                                match = true;
                            }
                        }
                    });
                    return match;
                });

                this.loading = false;
            }, (error) => {
                console.log(error);
                alert(this._textService.getText().serverError);
            });
        });
    }

    onItemTap(args) {
        if (args.index < this.requests.length - 1) {
            var selectedRequest: RequestDetails = this.requests[args.index];
            this._requestPickerService.requestDetails = selectedRequest;
            this._router.navigate(["/GuestScreen/RequestDetails"]);
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router"
var dialogs = require("ui/dialogs");
import { RequestPickerService, RequestDetails } from "../../services/requestPicker.service";
import { UserIdService } from "../../services/userId.service";
import { TaskService } from "../../services/taskServices/task.service";
import { Task } from "../../services/taskServices/task";

@Component({
    selector: 'requestDetails',
    templateUrl: 'pages/requestDetails/requestDetails.html'
})
export class RequestDetailsComponent {

    requestDetails: RequestDetails;

    textInput: string;
    dateInput: Date;
    timeInput: Date;

    constructor(private _routerExtensions: RouterExtensions, private _requestPickerService: RequestPickerService, private _taskService: TaskService, private _userIdService: UserIdService) {
        this.requestDetails = _requestPickerService.requestDetails;
        console.log(JSON.stringify(this.requestDetails));
    }

    cancel() {
        this._routerExtensions.back();
    }

    send() {
        this._userIdService.getUserId().then((userID: string) => {

            var description: string = RequestDetails.getTaskLongDescription(this.requestDetails, userID, this.textInput, this.dateInput, this.timeInput);
            var priority: string = "normal";
            var date = new Date(this.dateInput.getFullYear(), this.dateInput.getMonth(), this.dateInput.getDate(), 
               this.timeInput.getHours(), this.timeInput.getMinutes(), this.timeInput.getSeconds()) || new Date();

            console.log("description: " + description);
            console.log("short description: " + this.requestDetails.title);
            console.log("date: " + date);
            console.log("priority: " + priority);
            console.log("userID: " + userID);

            var task: Task = new Task(
                description,
                this.requestDetails.title,
                date,
                priority,
                parseInt(userID)
            );
            this._taskService.sendTask(task)
                .subscribe(() => {
                    dialogs.alert({
                        title: "Complete",
                        message: "Request Sent! Expect a message from us in a few minutes with details, and feel free to message us first with any changes!",
                        okButtonText: "OK"
                    });
                    this._routerExtensions.router.navigate(["/Home"]);
                }, (error: any) => {
                    console.log(error);
                    alert("No connection to the internet. Request information not sent.");
                });

        });
    }

}
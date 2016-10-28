import { Task } from "../../../services/taskServices/task";
import { TaskService } from "../../../services/taskServices/task.service";
import { Component } from '@angular/core';
import { Router } from "@angular/router";
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;

@Component({
    selector: 'ownerTaskMaker',
    templateUrl: 'pages/ownwerPages/ownerTaskMaker/ownerTaskMaker.html',
    styleUrls: ['pages/ownwerPages/ownerTaskMaker/ownerTaskMaker.css'],
})
export class OwnerTaskMaker {

    guestID: string;
    request: Task = new Task("", "", new Date(), Task.Priorities[0], +this.guestID);

    constructor(private _router: Router, private taskService: TaskService) {
        var url : string = this._router.url;

        this.guestID = url.split("/").pop();
        console.log("GOT GUEST ID: " + this.guestID);
    }

    createTask() {
        //start the loading animation
        var loader = new LoadingIndicator();
        loader.show();

        //send task to server
        this.taskService.sendTask(this.request).subscribe((result) => {
            console.log("got response: " + result);

            //stop the loading animation
            loader.hide();

            //navigate back to home
            this._router.navigate(["OwnerScreen/Home"]);
        });
    }

    cancel() {
        this._router.navigate(["OwnerScreen/Home"]);
    }
}

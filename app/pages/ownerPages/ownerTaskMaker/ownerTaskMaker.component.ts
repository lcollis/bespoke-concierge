import { Task } from "../../../services/taskServices/task";
import { TaskService } from "../../../services/taskServices/task.service";
import { ChatService } from "../../../services/chatServices/chat.service";
import { Component } from '@angular/core';
import { Router } from "@angular/router";
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;

@Component({
    selector: 'ownerTaskMaker',
    templateUrl: 'pages/ownerPages/ownerTaskMaker/ownerTaskMaker.html',
    styleUrls: ['pages/ownerPages/ownerTaskMaker/ownerTaskMaker.css'],
})
export class OwnerTaskMaker {

    guestID: string;
    request: Task;

    constructor(private _router: Router, private taskService: TaskService, private _chatService: ChatService) {
        this.guestID = this._chatService.selectedChatUserID;
        console.log("GOT GUEST ID: " + this.guestID);
        this.request = new Task("", "", new Date(), Task.Priorities[0], parseInt(this.guestID));
    }

    createTask() {
        //start the loading animation
        var loader = new LoadingIndicator();
        loader.show();

        console.log(JSON.stringify(this.request));

        //send task to server
        this.taskService.sendTask(this.request).subscribe((result) => {
            console.log("got response: " + result);

            //stop the loading animation
            loader.hide();

            //navigate back to home
            this._router.navigate(["StaffScreen/Home"]);
        }, (error) => {
            console.log("error posting task");
            console.log(JSON.stringify(error));
            loader.hide();
            alert("Error. Task could not be made. Check your internet connection and try again");
        });
    }

    cancel() {
        this._router.navigate(["StaffScreen/Home"]);
    }
}

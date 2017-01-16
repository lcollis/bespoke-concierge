import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions} from "nativescript-angular/router";
import {Page} from "ui/page";
import { Color } from "color";
import {registerElement} from "nativescript-angular/element-registry";
import { TaskService } from "../../../services/taskServices/task.service";
import { DatabaseService } from "../../../services/database.service";
import { UserIdService } from "../../../services/userId.service";
import { User } from "../../../services/user";
import { Task } from "../../../services/taskServices/task";
import { Observable } from "rxjs/Observable";
import { ChatService } from "../../../services/chatServices/chat.service";
var dialogs = require("ui/dialogs");

@Component({
    selector: 'staffScreen',
    templateUrl: 'pages/staffPages/staffScreen/staffScreen.html',
    providers: [TaskService, ChatService, DatabaseService, UserIdService],
})

export class StaffScreenComponent {

    clockedSwitch: boolean;
    newMessages: boolean;
    private user: User;

    constructor(page: Page, private _router: Router, private _taskService: TaskService, private _databaseService: DatabaseService, private _userIdService: UserIdService, private _chatService: ChatService, private _ngZone: NgZone) {
        page.actionBarHidden = true;

        // //clocking in and out
        // this._userIdService.getUserId().then((userID: string) => {
        //     this._databaseService.getApiData("Users").subscribe(
        //         (response) => {
        //             //get the user from the server
        //             this.user = response._body.filter((u: User) => { return u.CMSUserID === parseInt(userID) })[0];
        //             if(!this.user) {
        //                 alert("Could not find your userID in the server. Please try again.");
        //                 this._router.navigate(["/Login"]);
        //             }
        //             //set the clocked value to the servers value
        //             this.clockedSwitch = this.user.Clocked;
        //         });
        // }, (error) => {

        // });

        //allows for ios statusbar coloring
        page.backgroundSpanUnderStatusBar = true;
        page.backgroundColor = new Color("lightblue");
        try {
            registerElement("StatusBar", () => require("nativescript-statusbar").StatusBar);
        } catch (error) { }
    }

    duty() {

    }

    lookup() {

    }

    home() {
        this._router.navigate(['/StaffScreen/Home']);
        this._taskService.callUpdateTaskListCallback();
    }

    switchPropertyChange(args) {

        //this doesnt work yet. Waiting on api updates. The logic is almost sound.
    /*    if(args.propertyName === "checked") {
            var clocked = this.user.Clocked;

            if(clocked === true) {
                //currently clocked in, so clock out
                this.getMyTasks().subscribe(
                    (tasks) => {
                        if(tasks.length > 0) {
                            //user still has tasks assigned to them. Prompt and make sure they know these tasks will be unassigned when they clock out
                            dialogs.confirm({
                                title: "Clocking Out",
                                message: "When you clock out, all tasks assigned to you will be unassigned. Are you sure you want to clock out?",
                                okButtonText: "Clock Out",
                                cancelButtonText: "Cancel"
                            }).then(function (result) {
                                // result argument is boolean
                                console.log("Dialog result: " + result);
                            });
                        } else {
                            //no tasks. clock out
                            this.clockOut();
                        }
                    }, (error) => {
                        alert("Error while clocking out. You are still clocked in. Please check your internet connection and try again.");
                    });

            } else {
                //currently clocked out, so clock in
                this.clockIn();
            }
        } */
    }

    private getMyTasks(): Observable<Task[]> {
        return this._taskService.getAllTasks()
            .map((tasks: Task[]) => {
                if (tasks) {
                    return tasks.filter((t) => { return t.PersonID === this.user.CMSUserID });
                } else {
                    return new Array<Task>();
                }});
    }

    private clockOut() {
        this.user.Clocked = false;

        this._databaseService.putObject("Users", this.user, this.user.CMSUserID).subscribe(
            (response) => {
                console.log("got response: " + JSON.stringify(response));
            }, (error) => {
                console.log(error);
            });
    }

    private clockIn() {
        this.user.Clocked = true;

        this._databaseService.putObject("Users", this.user, this.user.CMSUserID).subscribe(
            (response) => {
                console.log("got response: " + JSON.stringify(response));
            }, (error) => {
                console.log(error);
            });
    }
}

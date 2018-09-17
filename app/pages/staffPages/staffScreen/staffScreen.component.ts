import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from "ui/page";
import { Color } from "color";
import { registerElement } from "nativescript-angular/element-registry";
import { TaskService } from "../../../services/taskServices/task.service";
import { DatabaseService } from "../../../services/database.service";
import { UserIdService } from "../../../services/userId.service";
import { User } from "../../../services/user";
import { Observable } from "rxjs/Observable";
import { ChatListService } from "../../../services/chatServices/chatList.service";
import { ChatDatabaseAdapter } from "../../../services/chatServices/chatDatabaseAdapter.service";
var dialogs = require("ui/dialogs");

@Component({
    selector: 'staffScreen',
    templateUrl: 'pages/staffPages/staffScreen/staffScreen.html',
    providers: [TaskService, ChatListService, DatabaseService, UserIdService, ChatDatabaseAdapter],
})

export class StaffScreenComponent {

    clockedSwitch: boolean;
    private user: User;

    userID: string;

    constructor(page: Page, private _router: Router, private _taskService: TaskService, private _databaseService: DatabaseService, private _userIdService: UserIdService, private _chatListService: ChatListService) {
        //get userId
        this._userIdService.getUserId().then((userID: string) => {
            this.userID = userID;
        }).catch((error: any) => {
            console.log("Error getting userID");
            console.log(error);
        });

        page.actionBarHidden = true;
        page.backgroundSpanUnderStatusBar = true; //allows for ios statusbar coloring
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

    }

    // TODO: not sure if this is necessary here...
    // private getMyTasks(): Observable<Task[]> {
    //     return this._taskService.getAllTasks()
    //         .map((tasks: Task[]) => {
    //             if (tasks) {
    //                 return tasks.filter((t) => { return t.PersonID === this.user.CMSUserID });
    //             } else {
    //                 return new Array<Task>();
    //             }});
    // }

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

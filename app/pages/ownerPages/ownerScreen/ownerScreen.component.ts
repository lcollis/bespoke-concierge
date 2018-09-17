import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from "ui/page";
import { Color } from "color";
import { registerElement } from "nativescript-angular/element-registry";
import { UserIdService } from "../../../services/userId.service";
import { DatabaseService } from "../../../services/database.service";
import { TaskService } from "../../../services/taskServices/task.service";
import { ChatDatabaseAdapter } from "../../../services/chatServices/chatDatabaseAdapter.service";
import { ChatListService } from "../../../services/chatServices/chatList.service";

@Component({
    selector: 'ownerScreen',
    templateUrl: 'pages/ownerPages/ownerScreen/ownerScreen.html',
    providers: [TaskService, DatabaseService, ChatListService, UserIdService, ChatDatabaseAdapter],
})

export class OwnerScreenComponent {

    userID: string;

    constructor(page: Page, private _router: Router, private _taskService: TaskService, private _chatListService: ChatListService, private _userIdService: UserIdService) {
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
        this._router.navigate(['/OwnerScreen/Home']);
        this._taskService.callUpdateTaskListCallback();
    }

    switchPropertyChange(args) {
        console.log("switch: " + args.propertyName);
    }
}

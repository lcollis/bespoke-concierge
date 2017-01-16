import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions} from "nativescript-angular/router";
import {Page} from "ui/page";
import { Color } from "color";
import {registerElement} from "nativescript-angular/element-registry";
import { TaskService } from "../../../services/taskServices/task.service";
import { ChatService } from "../../../services/chatServices/chat.service";

@Component({
    selector: 'ownerScreen',
    templateUrl: 'pages/ownerPages/ownerScreen/ownerScreen.html',
})

export class OwnerScreenComponent {

    newMessages: boolean;

    constructor(page: Page, private _router: Router, private _taskService: TaskService, private _chatService: ChatService, private _ngZone: NgZone) {
        page.actionBarHidden = true;

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
        this._router.navigate(['/OwnerScreen/Home']);
        this._taskService.callUpdateTaskListCallback();
    }

    switchPropertyChange(args) {
        console.log("Switch: " + args.propertyName);
    }
}

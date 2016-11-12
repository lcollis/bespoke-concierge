import { Component, NgZone } from '@angular/core';
import { RouterExtensions} from "nativescript-angular/router";
import {registerElement} from "nativescript-angular/element-registry";
import { ChatService } from "../../services/chatServices/chat.service";
import {Page} from "ui/page";
import { Color } from "color";
import { UserIdService } from "../../services/userId.service";
import { DatabaseService } from "../../services/database.service";
import { TaskService } from "../../services/taskServices/task.service";
import { RequestPickerService } from "../../services/requestPicker.service";

var phone = require( "nativescript-phone" );

@Component({
    selector: 'guestScreen',
    templateUrl: "pages/guestScreen/guestScreen.html",
    providers: [DatabaseService, TaskService, RequestPickerService],
})

export class GuestScreenComponent {

    newMessages: boolean = false;

    constructor(page: Page, _routerExtensions: RouterExtensions, _chatService: ChatService, _userIdService: UserIdService, private _ngZone: NgZone) {
        _userIdService.getUserId().then((userID: string) => {
            _chatService.subscribeToNewMessagesCallback(userID, "default", (newMessages) => { 
                _ngZone.run(() => {
                    console.log("--------------Got new Messages update and its: " + newMessages);
                    this.newMessages = newMessages; });
            });
        });

        page.actionBarHidden = true;

        //allows for ios statusbar coloring
        page.backgroundSpanUnderStatusBar = true;
        page.backgroundColor = new Color("lightblue");
        try {
            registerElement("StatusBar", () => require("nativescript-statusbar").StatusBar);
        } catch (error) { }
    }

    phone() {
        console.log("PHONE");
        phone.dial("123-456-7890", true);
    }
}

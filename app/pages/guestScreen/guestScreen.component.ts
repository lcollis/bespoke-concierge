import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS, RouterExtensions} from "nativescript-angular/router";
import {registerElement} from "nativescript-angular/element-registry";
import { ChatService } from "../../services/chatServices/chat.service";
import {Page} from "ui/page";
import { Color } from "color";
import { UserIdService } from "../../services/userId.service";
import { NgZone } from "@angular/core/src/zone/ng_zone";

@Component({
    selector: 'guestScreen',
    templateUrl: "pages/guestScreen/guestScreen.html",
    directives: [NS_ROUTER_DIRECTIVES, ROUTER_DIRECTIVES]
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
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from "../../services/chatServices/chat.service";
import {FBData} from "nativescript-plugin-firebase";
import {Chat} from "../../services/chatServices/chat";
import {FromNowPipe} from "../../pipes/fromnow.pipe";

@Component({
    selector: 'adminChatSelector',
    templateUrl: 'pages/adminChatSelector/adminChatSelector.html',
    pipes: [FromNowPipe]
})
export class AdminChatSelectorComponent {

    chats: Chat[];
    userID: string;

    constructor(private _router: Router, private _chatService: ChatService) { }

    ngOnInit() {
        var that = this;

        this._chatService.getListOfChats((data: FBData) => {
            console.log("got Firebase data: " + JSON.stringify(data));

            if(data.value) {
                that.chats = new Array<Chat>();
                Object.keys(data.value).forEach(function(key) {
                    var chat: Chat = data.value[key].default;
                    console.log("Got chat: " + JSON.stringify(chat));
                    that.chats.unshift(chat);
                })
            }
        });
    }

    onItemTap(args) {
        // var selectedChat: Chat = this.chats[args.index];
        // this.adminHz.otherUserID = selectedChat.id;
        // this._router.navigate(["/AdminChat"]);
    }

    onNavBtnTap() {
        this._router.navigate(['/AdminHome']);
        //this.adminHz.disconnect();
    }
}
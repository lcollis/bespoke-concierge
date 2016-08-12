import { Component, NgZone } from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from "../../../services/chatServices/chat.service";
import {FromNowPipe} from "../../../pipes/fromnow.pipe";
import {Chat} from "../../../services/chatServices/chat";
import {FBData} from "nativescript-plugin-firebase";

@Component({
    selector: 'ownerChatSelector',
    templateUrl: 'pages/ownerPages/ownerChatSelector/ownerChatSelector.html',
    styleUrls: ['pages/ownerPages/ownerChatSelector/ownerChatSelector.css'],
    pipes: [FromNowPipe]
})
export class OwnerChatSelectorComponent {
    chats: Chat[];
    userID: string;
    loading: boolean = true;

    constructor(private _router: Router, private _chatService: ChatService, private _ngZone: NgZone) { }

    ngOnInit() {
        var that = this;

        this._chatService.getListOfChats((data: FBData) => {
            if (data.value) {
                that.chats = new Array<Chat>();
                Object.keys(data.value).forEach(function (key) {
                    var chat: Chat = data.value[key].default;
                    that.chats.unshift(chat);
                });

                this._ngZone.run(() => {
                    //sort chats by last message time
                    that.chats = that.chats.sort(function (c, d) {
                        var a = c.lastMessageTime;
                        var b = d.lastMessageTime;
                        return a > b ? -1 : a < b ? 1 : 0;
                    });
                    that.loading = false;
                });
            }
        });
    }

    onItemTap(args) {
       var index = args.index;
       var chat: Chat = this.chats[index] 
       this._chatService.selectedChatUserID = chat.guestID;
       this._router.navigate(['/OwnerScreen/Chat']);
    }
}
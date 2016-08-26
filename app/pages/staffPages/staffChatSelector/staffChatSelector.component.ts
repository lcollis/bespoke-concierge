import { Component, NgZone, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from "../../../services/chatServices/chat.service";
import {FromNowPipe} from "../../../pipes/fromnow.pipe";
import {Chat} from "../../../services/chatServices/chat";
import {FBData} from "nativescript-plugin-firebase";

@Component({
    selector: 'staffChatSelector',
    templateUrl: 'pages/staffPages/staffChatSelector/staffChatSelector.html',
    styleUrls: ['pages/staffPages/staffChatSelector/staffChatSelector.css'],
    pipes: [FromNowPipe]
})
export class StaffChatSelectorComponent {
    chats: Chat[];
    hasNewMessage: boolean[];
    userID: string;
    loading: boolean = true;

    @ViewChild("chatlist") chatlist;

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

                that._ngZone.run(() => {
                    //sort chats by last message time
                    that.chats = that.chats.sort(function (c, d) {
                        var a = c.lastMessageTime;
                        var b = d.lastMessageTime;
                        return a > b ? -1 : a < b ? 1 : 0;
                    });

                    //set the has new messages flag
                    that.hasNewMessage = new Array<boolean>(that.chats.length);
                    
                    that.chats.forEach((chat: Chat, index: number) => {
                        that._chatService.chatHasNewMessages(chat.guestID, (hasNewMessages: boolean) => {
                            that._ngZone.run(() => {
                                that.hasNewMessage[index] = hasNewMessages;
                                console.log("Writting: " + hasNewMessages);
                                if(index === that.hasNewMessage.length - 1) {
                                    that.loading = false;
                                }
                            });
                        });
                    });

                });
            }
        });
    }

    chatHasNewMessage(chat: Chat): boolean {
        var index = this.chats.indexOf(chat);
        console.log("asking for index: " + index);
        console.log("giving answer: " + this.hasNewMessage[index]);
        return this.hasNewMessage[index];
    }

    onItemTap(args) {
       var index = args.index;
       var chat: Chat = this.chats[index] 
       this._chatService.selectedChatUserID = chat.guestID;
       this._router.navigate(['/StaffScreen/Chat']);
    }
}

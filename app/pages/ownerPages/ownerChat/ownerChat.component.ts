import { Component, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FBData, PushResult } from "nativescript-plugin-firebase";
import { ListView } from "ui/list-view";
import { FromNowPipe } from '../../../pipes/fromnow.pipe';
import { AdminChatService } from "../../../services/chatServices/adminChat.service";
import { UserIdService } from "../../../services/userId.service";
import { Message } from "../../../services/chatServices/message";


@Component({
    selector: 'staffChat',
    templateUrl: 'pages/staffPages/staffChat/staffChat.html',
    styleUrls: ['pages/staffPages/staffChat/staffChat.css'],
})
export class OwnerChatComponent {

    messages: Message[] = new Array<Message>();
    newMessage: string;
    guestID: string;
    userID: string;
    room: string = "default";
    loading: boolean = true;

    @ViewChild("listview") listView;

    constructor(private _chatService: AdminChatService, private _userIdService: UserIdService, ngZone: NgZone, private _router: Router) {
        var that = this;

        this.messages = new Array<Message>();
        this.guestID = this._chatService.selectedChatUserID;

        //get messages for guestID
        that._userIdService.getUserId()
            .then((userID: string) => {
                that.userID = userID;

                that._chatService.subscribeToMessages(that.guestID, that.room,
                    (data: FBData) => {
                        //use ngZone run because this method gets called outside of angular's zone so you gotta nudge it to update the screen
                        ngZone.run(() => {
                            console.log("got Firebase data: " + JSON.stringify(data.value));
                            that.loading = false;
                            if (data.value) {
                                that.messages = new Array<Message>();
                                Object.keys(data.value).forEach(function (key) {
                                    var message: Message = data.value[key];
                                    console.log("Got Message: " + JSON.stringify(message));
                                    that.messages.push(message);
                                });
                                //sort messages by time sent
                                that.messages.sort(function (a, b) {
                                    var c = new Date(a.timeStamp);
                                    var d = new Date(b.timeStamp);
                                    return c > d ? 1 : c < d ? -1 : 0;
                                });

                                setTimeout(function () {
                                    that.listView._elementRef.nativeElement.scrollToIndex(that.messages.length - 1);
                                }, 0);
                            }
                        });
                    });
            })
            .catch((error: any) => {
                console.log("Error getting userID");
                console.log(error);
            });
    }

    addMessage(text) {
        if (text) {
            console.log("+++++++++++ message: " + text + "  sender: " + this.userID);
            var message: Message = { text: text, sender: this.userID, timeStamp: Date.now() };
            this.messages.push(message);
            this._chatService.sendMessage(message, this.guestID, this.room)
                .catch((error: any) => {
                    console.log(error);
                    alert("Error sending message. Please try again later");
                });
            this.newMessage = '';
        }
    }

    isMessageFromMe(message: Message): boolean {
        return message.sender !== this.guestID;
    }

    makeRequest() {
        this._router.navigate(["/OwnerScreen/TaskMaker/" + this.guestID]);
    }
}

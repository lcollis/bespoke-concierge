import { Component, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FBData, PushResult } from "nativescript-plugin-firebase";
import { ListView } from "ui/list-view";
import { FromNowPipe } from '../../pipes/fromnow.pipe';
import { ChatService } from "../../services/chatServices/chat.service";
import { UserIdService } from "../../services/userId.service";
import { Message } from "../../services/chatServices/message";

@Component({
    selector: 'chat',
    templateUrl: 'pages/chat/chat.html',
    styleUrls: ['pages/chat/chat.css'],
    pipes: [FromNowPipe]
})
export class ChatComponent {

    messages: Message[] = new Array<Message>();
    newMessage: string;
    userID: string;
    room: string = "default";
    loading: boolean = true;

    @ViewChild("listview") listView;

    constructor(private _chatService: ChatService, private _userIdService: UserIdService, ngZone: NgZone) {
        var that = this;

        this.messages = new Array<Message>();

        //get userId and then get messages for that userID from the server
        that._userIdService.getUserId()
            .then((userID: string) => {
                that.userID = userID;

                that._chatService.subscribeToMessages(that.userID, that.room,
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
                            }
                        });
                    });
            })
            .catch((error: any) => {
                console.log("Error getting userID");
                console.log(error);
            });
    }

    ngOnInit() {
        //scroll to bottom with a new message
        console.log("DELETE ME~!!!!!!!!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~")
        var that = this;
        this.listView._elementRef.nativeElement.addEventListener(ListView.propertyChangeEvent,
            () => {

                //gotta have the little delay or else the list view doesn't listen on anything but the initial load.
                setTimeout(function () {
                    if (that.messages) {
                        console.log("trying to scroll to bottton messages length: " + that.messages.length);
                        that.listView._elementRef.nativeElement.scrollToIndex(that.messages.length - 1);
                    } else {
                        console.log("no messasge");
                    }
                }, 0)
            });
    }

    addMessage(message) {
        console.log("+++++++++++ message: " + message + "  sender: " + this.userID);
        this.messages.push({ text: message, timeStamp: Date.now(), sender: this.userID });
        this._chatService.sendMessage(this.newMessage, this.userID, this.room)
            .catch((error: any) => {
                console.log(error);
                alert("Error sending message. Please try again later");
            });
        this.newMessage = '';
    }

    isMessageFromMe(message: Message): boolean {
        return message.sender === this.userID;
    }
}
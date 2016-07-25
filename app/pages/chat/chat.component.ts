import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import {Router} from '@angular/router';
import {FromNowPipe} from '../../pipes/fromnow.pipe';
import {ChatService} from "../../services/chatServices/chat.service";
import {UserIdService} from "../../services/userId.service";
import { FBData, PushResult } from "nativescript-plugin-firebase";
import {Message} from "../../services/chatServices/message";
import {ListView} from "ui/list-view";
import {EventData} from "data/observable";

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

    constructor(private _router: Router, private _chatService: ChatService, private _userIdService: UserIdService, ngZone: NgZone) {
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
                            that.loading = false;
                            if(data.value)
                            that.messages = data.value;
                        });
                    });
            })
            .catch((error: any) => {
                console.log("Error getting userID");
                console.log(error);
            });
    }

    

    ngOnInit() {

    }

    addMessage(message) {
        console.log("+++++++++++ message: " + message + "  sender: "  + this.userID);
        this.messages.push({ text: message, timeStamp: new Date(), sender: this.userID });
        this._chatService.sendMessage(this.newMessage, this.userID, this.room)
            .catch((error: any) => {
                console.log(error);
                alert("Error sending message. Please try again later");
            });
        this.newMessage = '';
    }

    scrollToBottom(event: EventData) {
        this.listView._elementRef.nativeElement.scrollToIndex(this.messages.length - 1);
    }

    isMessageFromMe(message: Message): boolean {
        return message.sender === this.userID;
    }

    onNavBtnTap() {
        this._router.navigate(['/Home']);
    }
}
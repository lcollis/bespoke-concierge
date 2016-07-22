import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {AdminHorizonService} from "../../../services/chatServices/adminHorizon.service";
import {FromNowPipe} from '../../../pipes/fromnow.pipe';
import {Message} from "../../../services/chatServices/message";
import {ListView} from "ui/list-view";
import {EventData} from "data/observable";

@Component({
    selector: 'adminChat',
    templateUrl: 'pages/chat/chat.html',
    styleUrls: ["pages/chat/chat.css"],
    pipes: [FromNowPipe]
})
export class AdminChatComponent {
    constructor(private _router: Router, private adminHz: AdminHorizonService) { }

    messages: Message[] = new Array<Message>();
    newMessage: string;
    userID: string;
    loading: boolean = true;

    @ViewChild("listview") listView;

    ngOnInit() {
        var that = this;

        //get the userID and then after that get the messages for that userID
        this.adminHz.getUserID().then(function (content) {
            that.userID = content + '_admin';
            that.adminHz.getMessages().subscribe(function (messageData) {
                console.log('updating');
                that.loading = false;
                if (messageData) {
                    var messages = messageData.messages;
                    //sort messages by time stamp
                    that.messages = messages.sort(function (a, b) { return a.timeStamp.getTime() - b.timeStamp.getTime() });
                    //scroll to bottom every time a message is added
                    that.listView._elementRef.nativeElement.addEventListener(ListView.propertyChangeEvent, that.scrollToBottom, that);
                } else {
                    console.log("Messages Empty")
                }
            },
                error => {
                    console.log("Couldn't Connect to Chat Server with error: " + error);
                    alert("Could not connect to chat server. Please connect to the internet or try again later.");
                    that._router.navigate(['Home']);
                });
        }, function (error) {
            console.log(error);
        });
    }

    addMessage(message) {
        this.messages.push({ text: message, timeStamp: new Date(), sender: this.userID });
        this.adminHz.sendMessages(this.messages).subscribe((res) => { }, error => { console.log(error) })
        this.newMessage = '';
    }

    onNavBtnTap() {
        this._router.navigate(['AdminChatSelector']);
    }

    scrollToBottom(event: EventData) {
        this.listView._elementRef.nativeElement.scrollToIndex(this.messages.length - 1);
    }

    isMessageFromMe(message: Message): boolean {
        return message.sender !== this.adminHz.otherUserID;
    }
}
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {HorizonChatService} from "../../services/chatServices/horizonChat.service";
import {FromNowPipe} from '../../pipes/fromnow.pipe';
import {Message} from "../../services/chatServices/message";

@Component({
    selector: 'chat',
    templateUrl: 'pages/chat/chat.html',
    providers: [HorizonChatService],
    pipes: [FromNowPipe]
})
export class ChatComponent {
    constructor(private _router: Router, private horizon: HorizonChatService) { }

    messages: Message[] = new Array<Message>();
    newMessage: string;
    userID: string;

    ngOnInit() {
        var that = this;

        //get the userID and then after that get the messages for that userID
        this.horizon.getUserID().then(function (content) {
            that.userID = content;
            that.horizon.getMessages().subscribe((messageData) => {
                console.log('updating');
                if (messageData) {
                    var messages = messageData.messages;
                    //sort messages by time stamp
                    that.messages = messages.sort(function (a, b) { return a.timeStamp.getTime() - b.timeStamp.getTime() });
                } else {
                    console.log("Messages Empty")
                }
            },
                error => { console.log(error) });
        }, function (error) {
            console.log(error);
        });
    }

    addMessage(message) {
        this.messages.push({ text: message, timeStamp: new Date(), sender: this.userID });
        this.horizon.sendMessages(this.messages).subscribe((res) => {}, error => { console.log(error) })
        this.newMessage = '';
    }

    onNavBtnTap() {
        this._router.navigate(['Home']);
    }
}
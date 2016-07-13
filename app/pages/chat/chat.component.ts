import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {HorizonService} from "../../services/chatServices/horizon.service";
import {FromNowPipe} from '../../pipes/fromnow.pipe';
import {Message} from "../../services/chatServices/message";

@Component({
    selector: 'chat',
    templateUrl: 'pages/chat/chat.html',
    providers: [HorizonService],
    pipes: [FromNowPipe]
})
export class ChatComponent {
    constructor(private _router: Router, private horizon: HorizonService) { }

    messages: Message[] = new Array<Message>();
    newMessage: string;
    userID: string;
    loading: boolean = true;

    ngOnInit() {
        var that = this;

        //get the userID and then after that get the messages for that userID
        this.horizon.getUserID().then(function (content) {
            that.userID = content;
            that.horizon.getMessages().subscribe((messageData) => {
                console.log('updating');
                that.loading = false;
                if (messageData) {
                    var messages = messageData.messages;
                    //sort messages by time stamp
                    that.messages = messages.sort(function (a, b) { return a.timeStamp.getTime() - b.timeStamp.getTime() });
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
        this.horizon.sendMessages(this.messages).subscribe((res) => { }, error => { console.log(error) })
        this.newMessage = '';
    }

    onNavBtnTap() {
        this._router.navigate(['Home']);
        this.horizon.disconnect();
    }
}
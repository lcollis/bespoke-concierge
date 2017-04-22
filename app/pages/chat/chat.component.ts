import { Component, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FBData, PushResult } from "nativescript-plugin-firebase";
import { ListView } from "ui/list-view";
import { FromNowPipe } from '../../pipes/fromnow.pipe';
import { ChatService } from "../../services/chatServices/chat.service";
import { UserIdService } from "../../services/userId.service";
import { TextService } from "../../services/text.service";
import { Message } from "../../services/chatServices/message";

@Component({
    selector: 'chat',
    templateUrl: 'pages/chat/chat.html',
    styleUrls: ['pages/chat/chat.css'],
})


export class ChatComponent {

    newMessage: string;
    userID: string;
    loading: boolean = false;

    @ViewChild("listview") listView;

    // constructor(private _chatService: ChatService, private _userIdService: UserIdService, ngZone: NgZone, private _textService: TextService) {
    //     //get userId
    //     this._userIdService.getUserId()
    //         .then((userID: string) => {
    //             this.userID = userID;
    //         })
    //         .catch((error: any) => {
    //             console.log("Error getting userID");
    //             console.log(error);
    //         });
    // }

    // ngOnInit() {
    //     this.scrollToBottom();
    //     var that = this;
    //     this._chatService.onMessage(() => {
    //         this.scrollToBottom(that);
    //     });


    //     //TODO REMOVE THIS TESTING
    //     console.log("CHAT COMPONENT GOT MESSAGES: " + JSON.stringify(this._chatService.messages));
    // }

    // addMessage(text) {
    //     if (text) {
    //         var message: Message = new Message(text, Date.now(), this.userID);
    //         this._chatService.sendMessage(message, this.userID)
    //             .catch((error: any) => {
    //                 console.log(error);
    //                 alert(this._textService.getText().chatError);
    //             });
    //         this.newMessage = '';
    //     }
    // }

    // isMessageFromMe(message: Message): boolean {
    //     return message.sender === this.userID;
    // }


    // private scrollToBottom(that=this) {
    //     //needs the delay because this method gets called when the listview items are changing, or very soon afer that, and it takes the list view a little bit to get setup, and without this it will not scroll to the right spot consistently
    //     setTimeout(() => {
    //         that.listView._elementRef.nativeElement.scrollToIndex(that._chatService.messages.length - 1);
    //     }, 30);
    // }
}

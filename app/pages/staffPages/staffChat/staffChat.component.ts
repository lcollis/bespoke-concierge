import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ListView } from "ui/list-view";
import { FromNowPipe } from '../../../pipes/fromnow.pipe';
import { ChatService } from "../../../services/chatServices/chat.service";
import { ChatListService } from "../../../services/chatServices/chatList.service";
import { UserIdService } from "../../../services/userId.service";
import { Message } from "../../../services/chatServices/message";

@Component({
    selector: 'staffChat',
    templateUrl: 'pages/staffPages/staffChat/staffChat.html',
    styleUrls: ['pages/staffPages/staffChat/staffChat.css'],
})
export class StaffChatComponent {

    userID: string;
    newMessage: string;

    @ViewChild("listview") listView;

    constructor(private _chatService: ChatService, private _chatListService: ChatListService, private _userIdService: UserIdService, private _router: Router) {
        //get the right chat data
        this._chatService.connectToChatWithGuestID(this._chatListService.selectedChatUserID, () => {
            //on new messages
            this.scrollToBottom();
        }, this);

        //get userId
        this._userIdService.getUserId().then((userID: string) => {
            this.userID = userID;
        }).catch((error: any) => {
            console.log("Error getting userID");
            console.log(error);
        });
    }

    ngOnDestroy() {
        this._chatService.disconnectCallback(this);
    }

    isMessageFromMe(message: Message): boolean {
        return message.sender !== this._chatService.chat.metadata.guestID;
    }

    sendMessage(text) {
        if (text) {
            var message: Message = new Message(text, Date.now(), this.userID);
            this._chatService.sendMessage(message);
            this.newMessage = '';
        }
    }

    makeRequest() {
        this._router.navigate(["/StaffScreen/TaskMaker"]);
    }

    private scrollToBottom() {
        //needs the delay because this method gets called when the listview items are changing, or very soon afer that, and it takes the list view a little bit to get setup, and without this it will not scroll to the right spot consistently
        setTimeout(() => {
            this.listView._elementRef.nativeElement.scrollToIndex(this._chatService.chat.messages.length - 1);
        }, 30);
    }
}

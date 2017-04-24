import { Component, ViewChild } from '@angular/core';
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
    @ViewChild("listview") listView;

    constructor(private _chatService: ChatService, private _userIdService: UserIdService) {
        this._userIdService.getUserId()
            .then((userID: string) => {
                this.userID = userID;
                this._chatService.connectToChatWithGuestID(this.userID, this.userID, this.scrollToBottom, this, true);
            })
            .catch((error: any) => {
                console.log("Error getting userID");
                console.log(error);
            });
    }

    ngAfterViewInit() {
        this.scrollToBottom();
    }

    ngOnDestroy() {
        this._chatService.disconnectCallback(this);
    }

    addMessage(text) {
        if (text) {
            this.newMessage = "";
            var message: Message = new Message(text, Date.now(), this.userID);
            this._chatService.sendMessage(message);
        }
    }

    isMessageFromMe(message: Message): boolean {
        return message.sender === this.userID;
    }

    private scrollToBottom() {
        //needs the delay because this method gets called when the listview items are changing, or very soon afer that, and it takes the list view a little bit to get setup, and without this it will not scroll to the right spot consistently
        setTimeout(() => {
            this.listView._elementRef.nativeElement.scrollToIndex(this._chatService.chat.messages.length - 1);
        }, 30);
    }
}

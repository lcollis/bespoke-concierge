import { Component, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChatListService } from "../../../services/chatServices/chatList.service";
import { ChatMetadata } from "../../../services/chatServices/chatMetadata";
import { FromNowPipe } from "../../../pipes/fromnow.pipe";
import { Chat } from "../../../services/chatServices/chat";
import { FBData } from "nativescript-plugin-firebase";
import { UserIdService } from "../../../services/userId.service";

@Component({
    selector: 'staffChatSelector',
    templateUrl: 'pages/staffPages/staffChatSelector/staffChatSelector.html',
    styleUrls: ['pages/staffPages/staffChatSelector/staffChatSelector.css'],
})
export class StaffChatSelectorComponent {
    userID: string;

    @ViewChild("chatlist") chatlist;

    constructor(private _router: Router, private _chatListService: ChatListService, private _userIdService: UserIdService, private _ngZone: NgZone) {
        //get userId
        this._userIdService.getUserId().then((userID: string) => {
            this.userID = userID;
        }).catch((error: any) => {
            console.log("Error getting userID");
            console.log(error);
        });
    }

    onItemTap(args) {
        //go to the tapped chat
        var index = args.index;
        var chat: ChatMetadata = new ChatMetadata(this._chatListService.chats[index]);
        this._chatListService.selectedChatUserID = chat.guestID;
        this._router.navigate(['/StaffScreen/Chat']);
    }
}

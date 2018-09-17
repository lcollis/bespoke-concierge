import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ChatListService } from "../../../services/chatServices/chatList.service";
import { ChatMetadata } from "../../../services/chatServices/chatMetadata";
import { FromNowPipe } from "../../../pipes/fromnow.pipe";
import { UserIdService } from "../../../services/userId.service";

@Component({
    selector: 'ownerChatSelector',
    templateUrl: 'pages/ownerPages/ownerChatSelector/ownerChatSelector.html',
    styleUrls: ['pages/ownerPages/ownerChatSelector/ownerChatSelector.css'],
})
export class OwnerChatSelectorComponent {
    userID: string;

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
        this._router.navigate(['/OwnerScreen/Chat']);
    }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {AdminHorizonService} from "../../services/chatServices/adminHorizon.service";
import {Chat} from "../../services/chatServices/chat";

@Component({
    selector: 'adminChatSelector',
    templateUrl: 'pages/adminChatSelector/adminChatSelector.html'
})
export class AdminChatSelectorComponent {

    chats: Chat[];
    userID: string;

    constructor(private _router: Router, private adminHz: AdminHorizonService) { }

    ngOnInit() {
        var that = this;

        this.adminHz.connect();
        
        console.log("Connecting");
        //get the userID and then after that get the messages for that userID
        this.adminHz.getUserID().then(function (content) {
            console.log("Got UserID");
            that.userID = content;
            that.adminHz.getAllChats().subscribe(function (chatData) {
                console.log('updating');
                if (chatData) {
                    //sort messages by time stamp
                    that.chats = chatData.sort(function (a, b) { return b.lastMessageTime.getTime() - a.lastMessageTime.getTime() });
                } else {
                    console.log("No Chats")
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
        console.log("Post Connecting");
    }

    onItemTap(args) {
        var selectedChat: Chat = this.chats[args.index];
        this.adminHz.otherUserID = selectedChat.id;
        this._router.navigate(["AdminChat"]);
    }

    onNavBtnTap() {
        this._router.navigate(['Home']);
        this.adminHz.disconnect();
    }
}
import { Injectable, NgZone } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";
import { Chat } from "./chat";
import { Message } from "./message";
import { FBData, PushResult } from "nativescript-plugin-firebase";
import { ChatService } from "./chat.service";
import firebase = require("nativescript-plugin-firebase");
import fs = require("file-system");

@Injectable()
export class AdminChatService {
    selectedChatUserID: string;
    selectedChatMessages: Message[] = new Array<Message>();
    private allMessagesData: FBData;
    private allChatsData: FBData;

    private onNewMessagesCallback: () => any;

    private startedToGetChats: boolean = false;
    private gotChats: boolean = false;
    private gotMessages: boolean = false;

    private viewingMessages: boolean = false;

    // constructor(private _router: Router, private _ngZone: NgZone) {
    //     //subscribe to the router's navigation in order to determine when the user has read messages
    //     _router.events.subscribe(event => {
    //         if(event instanceof NavigationStart) {
    //             if(this.canUrlSeeChats(event.url)) {
    //                 this.viewingMessages = true;
    //                 this.viewAllMessagesInChat(this.selectedChatUserID, this.isOwnerUrl(event.url));
    //             } else {
    //                 this.viewingMessages = false;
    //             }
    //         }
    //     });
    // }

    // sendMessage(message: Message, guestID: string, room: string = "default"): Promise<PushResult> {
    //     //TODO i deleted this because i think the messages should appear instantly without it but check that
    //     // //add the message the the messages array so it shows up on the screen
    //     // this.messages.push(message);

    //     //update the chat entry in firebase
    //     var chat: Chat = { room: room, lastMessageTime: message.timeStamp, guestID: guestID };
    //     var chatsUrl = "/chats/" + guestID + "/" + room;
    //     firebase.setValue(chatsUrl, chat);

    //     //update the messages list in firebase
    //     var messagesUrl = "/messages/" + guestID + "/" + room;
    //     return firebase.push(messagesUrl, message);
    // }

    // //Does a one time call to get the list of chats from firebase
    // getListOfChats(callback: (data: FBData) => any) {
    //     if(this.gotChats === true) {
    //         callback(this.allChatsData);
    //     } else {
    //         if(this.startedToGetChats === false) {
    //             this.startedToGetChats = true;
    //             this.getChats(callback);
    //         }
    //     }
    // }

    // //Checks if the chat has new message
    // //if for owner is true, it checks the message.seenByOwner, if not it checks message.seenByStaff
    // chatHasNewMessages(guestID: string, room: string, forOwner: boolean, callback: (hasNewMessages: boolean) => any) {
    //     var messages: Message[] = this.getGuestsMessages(guestID, room);
    //     var hasNewMessages = false;
    //     if(messages) {
    //         messages.forEach( (message: Message) => {
    //             if((forOwner && !message.seenByOwner) || (!forOwner && !message.seenByStaff)) {
    //                 hasNewMessages = true;
    //             }
    //         });
    //     }

    //     callback(hasNewMessages);
    // }

    // //gets the messages for a specific guest from the stored message data
    // //returns null if there are no messages for that guestID
    // getGuestsMessages(guestID: string, room: string = "default"): Message[] {
    //     var rawMessages = this.allMessagesData.value[guestID][room];

    //     var messages: Message[] = new Array<Message>();
    //     Object.keys(rawMessages).forEach( (key: string) => {
    //         var message: Message = rawMessages[key];
    //         messages.push(message);
    //     });

    //     //sort messages by time sent
    //     messages.sort(function (a, b) {
    //         var c = new Date(a.timeStamp);
    //         var d = new Date(b.timeStamp);
    //         return c > d ? 1 : c < d ? -1 : 0;
    //     });

    //     return messages;
    // }

    // getSelectedGuestsMessages() {
    //     if(this.selectedChatUserID) {
    //         this._ngZone.run(() => {
    //             this.selectedChatMessages = this.getGuestsMessages(this.selectedChatUserID);
    //         });
    //     }
    // }

    // //goes to the server and gets the chats
    // private getChats(callback: (data: FBData) => any) {
    //     var messagesUrl = "/messages";
    //     firebase.addValueEventListener((data: FBData) => this.gotMessageData(data), messagesUrl);

    //     var chatsUrl = "/chats"
    //     firebase.addValueEventListener((data: FBData) => this.gotChatData(data, callback), chatsUrl);
    // }

    // subscribeToNewMessages(callback: () => void) {
    //     this.onNewMessagesCallback = callback;
    // }

    // private viewAllMessagesInChat(guestID: string, forOwner: boolean, room: string = "default") {
    //     var messages = this.getGuestsMessages(guestID, room);
    //     console.log("ADMIN CHAT SERVICE: IN VIEW ALL MESSAGES");

    //     messages.map((message: Message) => {
    //         //find the messages id in the server
    //         var serverMessages = this.allMessagesData.value[guestID][room];
    //         Object.keys(serverMessages).forEach((key) => {
    //             var serverMessage: Message = serverMessages[key];
    //             if(serverMessage.timeStamp === message.timeStamp) {
    //                 //update the read value on the server
    //                 var url = "/messages/" + guestID + "/default/" + key;
    //                 if(forOwner && !message.seenByOwner) {
    //                     firebase.update(url, {'seenByOwner': true});
    //                     message.seenByOwner = true;
    //                 } else if(!message.seenByStaff) {
    //                     firebase.update(url, {'seenByStaff': true});
    //                     message.seenByStaff = true;
    //                 }
    //             }
    //         });
    //     });
    // }

    // private gotMessageData(data: FBData) {
    //     if(data.value) {
    //         this.allMessagesData = data;
    //         this.gotMessages = true;
    //         this.getSelectedGuestsMessages();


    //         //call the new messages callback
    //         if(this.onNewMessagesCallback) {
    //             this.onNewMessagesCallback();
    //         }
    //     }
    // }

    // private gotChatData(data: FBData, callback: (data: FBData) => any) {
    //     if(data.value) {
    //         this.allChatsData = data;
    //         this.gotChats = true;
    //         callback(data);
    //     }
    // }

    // private canUrlSeeChats(url: string): boolean {
    //     if(url === "/StaffScreen/Chat")
    //         return true;
    //     if(url === "/OwnerScreen/Chat")
    //         return true;

    //     return false;
    // }

    // private isOwnerUrl(url: string): boolean {
    //     if(url === "/Staffscreen/Chat")
    //         return true;
    //     if(url === "/Ownerscreen/Chat")
    //         return false;

    //     return false;
    // }
}

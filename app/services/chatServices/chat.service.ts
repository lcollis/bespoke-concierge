import { Injectable, NgZone } from '@angular/core';
import { Chat } from "./chat";
import { UserIdService } from "../userId.service";
import { ChatDatabaseAdapter } from "./chatDatabaseAdapter.service";
import { Message } from "./message";
import { ChatMetadata } from "./chatMetadata";
import { FBData, PushResult } from "nativescript-plugin-firebase";
import { Router, NavigationStart } from "@angular/router";
import firebase = require("nativescript-plugin-firebase");
import fs = require("file-system");

@Injectable()
export class ChatService {

    chat: Chat = new Chat();
    loadingMessages: boolean = true;

    constructor(private _chatDatabaseAdapter: ChatDatabaseAdapter, private _ngZone: NgZone) { }

    connectToChatWithGuestID(guestID: string, onNewMessagesCallback: () => any) {
        //set the chat metadatas guestID to the right guestID while the real metadata loads
        this.chat.metadata.guestID = guestID;


        //subscribe to the chat
        this._chatDatabaseAdapter.subscribeToChatMessages(guestID,
            (messages: Message[]) => {
                //run in ngzone so that the data is updated in the view
                this._ngZone.run(() => {
                    this.chat.messages = this.sortChatMessages(messages);
                    this.loadingMessages = false;

                    onNewMessagesCallback();
                });
            });

        //subscribe to the chat metadata
        this._chatDatabaseAdapter.subscribeToChatMetadata(guestID,
            (metadata: ChatMetadata) => {
                this.chat.metadata = metadata;
            });
    }

    sendMessage(message: Message) {
        //update the chat metadata in firebase
        this.chat.metadata.lastMessageTime = Math.max(this.chat.metadata.lastMessageTime, message.timeStamp);
        this.chat.metadata.resetSeenByIDs();
        this.chat.metadata.addSeenByID(message.sender);

        this._chatDatabaseAdapter.updateChatMetadata(this.chat.metadata);

        this._chatDatabaseAdapter.sendMessage(this.chat.metadata, message);

       //  var chatsUrl = "/chats/" + senderID + "/" + room;
       //  firebase.setValue(chatsUrl, chat);

       //  //update the messages list in firebase
       //  var messagesUrl = "/messages/" + senderID + "/" + room;
       // return firebase.push(messagesUrl, message);
    }

    unseenMessages(userID: string): boolean {
        if (this.chat) {
            return !this.chat.metadata.hasBeenSeenByID(userID);
        }

        return false;
    }

    private sortChatMessages(messages: Message[]): Message[] {
        messages.sort((a: Message, b: Message) => {
            return a.timeStamp - b.timeStamp;
        });

        return messages;
    }
    // messages: Message[] = new Array<Message>();
    // private messagesData: FBData;

    // unreadMessages: boolean = false; //public marker that there are new unread messages

    // private userID: string;

    // private onMessageCallback: () => any;

    // private lastViewedMessageTime: number;
    // private viewingMessages: boolean = false;
    // private lastViewedMessageFileName = "lastviewedmessage";

    // constructor(private _router: Router, private _userIdService: UserIdService, private _ngZone: NgZone) {
    //     //subscribe to the chat's message data
    //     this._userIdService.getUserId()
    //     .then(id => {
    //         this.userID = id;
    //         var messagesUrl = "/messages/" + this.userID + "/default";
    //         firebase.addValueEventListener((data: FBData) => this.gotMesageData(data), messagesUrl);
    //     })
    //     .catch(error => console.log(error));

    //     //subscribe to the router's navigation in order to determine when the user has read messages
    //     _router.events.subscribe(event => {
    //         if(event instanceof NavigationStart) {
    //             if(event.url === "/GuestScreen/Chat") {
    //                 this.viewingMessages = true;
    //                 this.viewAllMessages();
    //             } else {
    //                 this.viewingMessages = false;
    //             }
    //         }
    //     });
    // }


    // sendMessage(message, senderID, room="default"): Promise<any> {
    //     //add the message the the messages array so it shows up on the screen
    //     this.messages.push(message);

    //     //update the chat entry in firebase
    //     var chat: Chat = { room: room, lastMessageTime: message.timeStamp, guestID: senderID };
    //     var chatsUrl = "/chats/" + senderID + "/" + room;
    //     firebase.setValue(chatsUrl, chat);

    //     //update the messages list in firebase
    //     var messagesUrl = "/messages/" + senderID + "/" + room;
    //     return firebase.push(messagesUrl, message);
    // }

    // //this sets up a callback that lets the chat view know when new messages come in so it can scroll to the bottom
    // onMessage(callback: () => any) {
    //     this.onMessageCallback = callback;
    // }

    // private gotMesageData(data: FBData) {
    //     //needs the ngzone so that angular notices when new messages come in
    //     this._ngZone.run(() => {
    //         if(data.value) {
    //             this.messagesData = data;
    //             //fill this.messages with the messages
    //             this.messages = new Array<Message>();
    //             Object.keys(data.value).forEach((key) => {
    //                 var message: Message = data.value[key];
    //                 this.messages.push(message);
    //             });

    //             //sort messages by time sent
    //             this.messages.sort(function (a, b) {
    //                 var c = new Date(a.timeStamp);
    //                 var d = new Date(b.timeStamp);
    //                 return c > d ? 1 : c < d ? -1 : 0;
    //             });


    //             if(this.viewingMessages) {
    //                 //viewing the messages, so mark them all as read
    //                 this.viewAllMessages();
    //                 if(this.onMessageCallback) {
    //                     //call the onNewMessage callback to the view only if there is a callback and if viewing messages
    //                     this.onMessageCallback();
    //                 }
    //             } else {
    //                 this.checkForUnreadMessages();
    //             }
    //         }
    //     });
    // }

    // //checks if there are new unviewed messages
    // private checkForUnreadMessages() {
    //     console.log("CHAT SERVICE: checking for unread messages");
    //     var foundUnread = false;
    //     this.messages.map((message: Message) => {
    //         if(!message.seenByGuest) {
    //             foundUnread = true;
    //         }
    //     });

    //     console.log("CHAT SERVICE: unreadMessages: " + foundUnread);
    //     this.unreadMessages = foundUnread;
    // }

    // private viewAllMessages() {
    //     this.messages.map((message: Message) => {

    //         //find the messages id in the server
    //         var serverMessages = this.messagesData.value;
    //         Object.keys(serverMessages).forEach((key) => {
    //             var serverMessage: Message = serverMessages[key];
    //             if(serverMessage.timeStamp === message.timeStamp) {
    //                 if(!message.seenByGuest) {
    //                     message.seenByGuest = true;
    //                     //update the read value on the server
    //                     var url = "/messages/" + this.userID + "/default/" + key;
    //                     firebase.update(url, {'seenByGuest': true});
    //                 }
    //             }
    //         });
    //     });
    //     this.checkForUnreadMessages();
    // }
}

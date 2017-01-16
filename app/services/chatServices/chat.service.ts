import { Injectable, NgZone } from '@angular/core';
import { Chat } from "./chat";
import { UserIdService } from "../userId.service";
import { Message } from "./message";
import { FBData, PushResult } from "nativescript-plugin-firebase";
import { Router, NavigationStart } from "@angular/router";
import firebase = require("nativescript-plugin-firebase");
import fs = require("file-system");

@Injectable()
export class ChatService {

    messages: Message[] = new Array<Message>();
    newMessages: boolean = false; //public marker that there are new unread messages

    private userID: string;

    private onNewMessageCallback: () => any;

    private lastViewedMessageTime: number;
    private viewingMessages: boolean = false;
    private lastViewedMessageFileName = "lastviewedmessage";

    constructor(private _router: Router, private _userIdService: UserIdService, private _ngZone: NgZone) {
        this._userIdService.getUserId()
            .then(id => {
                    this.userID = id;
                    var messagesUrl = "/messages/" + this.userID + "/default";
                    firebase.addValueEventListener((data: FBData) => this.gotMesageData(data), messagesUrl);
                })
            .catch(error => console.log(error));

        _router.events.subscribe(event => {
            if(event instanceof NavigationStart) {
                if(event.url === "/GuestScreen/Chat") {
                    this.viewingMessages = true;
                    this.updateLastViewedMessage();
                    this.updateNewMessages();
                } else {
                    this.viewingMessages = false;
                }
            }
        });

        this.lastViewedMessageTime = parseInt(fs.knownFolders.documents().getFile(this.lastViewedMessageFileName).readTextSync((error) => console.log("error getting last viewed message: " + error)));
    }


    sendMessage(message, senderID, room="default"): Promise<any> {
        //add the message the the messages array so it shows up on the screen
        this.messages.push(message);

        //update the chat entry in firebase
        var chat: Chat = { room: room, lastMessageTime: message.timeStamp, guestID: senderID };
        var chatsUrl = "/chats/" + senderID + "/" + room;
        firebase.setValue(chatsUrl, chat);

        //update push the message to firebase
        var messagesUrl = "/messages/" + senderID + "/" + room;
        return firebase.push(messagesUrl, message);
    }

    //this sets up a callback that lets the chat view know when new messages come in so it can scroll to the bottom
    onNewMessage(callback: () => any) {
        this.onNewMessageCallback = callback;
    }



    private gotMesageData(data: FBData) {
        //needs the ngzone so that angular notices when new messages come in
        this._ngZone.run(() => {
            if(data.value) {
                //fill this.messages with the messages
                this.messages = new Array<Message>();
                Object.keys(data.value).forEach((key) => {
                    var message: Message = data.value[key];
                    this.messages.push(message);
                });

                //sort messages by time sent
                this.messages.sort(function (a, b) {
                    var c = new Date(a.timeStamp);
                    var d = new Date(b.timeStamp);
                    return c > d ? 1 : c < d ? -1 : 0;
                });

                //call the onNewMessage callback to the view
                if(this.onNewMessageCallback && this.viewingMessages) {
                    this.onNewMessageCallback();
                }


                //update last viewed message if viewing page
                if(this.viewingMessages) {
                    this.updateLastViewedMessage();
                }

                this.updateNewMessages();
            }
        });
    }

    //called whenever a new message is viewed
    private updateLastViewedMessage() {
        this.lastViewedMessageTime = this.messages[this.messages.length - 1].timeStamp;
        fs.knownFolders.documents().getFile(this.lastViewedMessageFileName).writeTextSync(this.lastViewedMessageTime + "", error => console.log(error));
    }

    //checks if there are new unviewed messages
    private updateNewMessages() {
        var newestMessageTime = this.messages[this.messages.length - 1].timeStamp;
        this.newMessages = newestMessageTime > this.lastViewedMessageTime;
    }
}

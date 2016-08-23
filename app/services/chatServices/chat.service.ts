import { Injectable } from '@angular/core';
import { Chat } from "./chat";
import { Message } from "./message";
import { FBData, PushResult } from "nativescript-plugin-firebase";
import { Router } from "@angular/router/src/router";
import firebase = require("nativescript-plugin-firebase");
import fs = require("file-system");

@Injectable()
export class ChatService {

    constructor(private _router: Router) { }

    selectedChatUserID: string;
    lastActiveTimeStamp: Date;

    private newChatsWatcherGuestID: string;
    private newChatsWatcherRoom: string;
    private newChatsWatcherCallback: () => any;


    sendMessage(message: Message, senderID: string, room: string): Promise<PushResult> {
        this.updateLastActive();

        var messagesUrl = "/messages/" + senderID + "/" + room;

        console.log("+++++++++++++++++++++ sending message: " + JSON.stringify(message));
        
        var chat: Chat = { room: room, lastMessageTime: message.timeStamp, guestID: senderID };
        var chatsUrl = "/chats/" + senderID + "/" + room;

        firebase.setValue(chatsUrl, chat);
        return firebase.push(messagesUrl, message);
    }

    subscribeToMessages(senderID: string, room: string, callBack: (data: FBData) => any) {
        var messagesUrl = "/messages/" + senderID + "/" + room;
        firebase.addValueEventListener((data: FBData) => this.callbackWrapper(data, callBack), messagesUrl);

        console.log("Subscribed to messages at url: " + messagesUrl);
    }

    getListOfChats(callBack: (data:FBData) => any) {
        var chatsUrl = "/chats";
        firebase.addValueEventListener((data: FBData) => this.callbackWrapper(data, callBack), chatsUrl);
    }

    subscribeToNewMessagesCallback(guestID: string, room: string, callback: ()=>void) {
        this.newChatsWatcherGuestID = guestID;
        this.newChatsWatcherRoom = room;
        this.newChatsWatcherCallback = callback;

        this.checkForNewMessages();

        //add a dummy messages subscription so that even if the user
        //doesnt look at the messages the ui still updates when they
        //get a new message inside the app
        this.subscribeToMessages(guestID, room, () => {});
    }

    getLastActiveTime(callback: (date: Date) => any) {
        var that = this;
        //get the active time from the phone storage
        fs.knownFolders.documents().getFile("lastActive").readText()
            .then((text: string) => {
                var date = new Date(text);
                
                //check if theyre both blank. If so, congrats its the first time in the app. return new date(0)
                if(text === "" && that.lastActiveTimeStamp === undefined) {
                    console.log("No last active timestamp recorded on phone! Should only happen on fresh installs!!!");
                    that.lastActiveTimeStamp = new Date(0);
                    fs.knownFolders.documents().getFile("lastActive").writeText(that.lastActiveTimeStamp.toString());
                    callback(that.lastActiveTimeStamp);
                    return;
                }

                //check if this.lastActiveTimeStamp is blank. if so, set it and return it
                if(that.lastActiveTimeStamp === undefined) {
                    that.lastActiveTimeStamp = date;
                    callback(that.lastActiveTimeStamp);
                    return;
                }

                //return the sooner of this.lastActiveTimestamp and the one from the file
                if(date.getTime() > that.lastActiveTimeStamp.getTime()) {
                    console.log("IN HERE");
                    that.lastActiveTimeStamp = date;
                } 
                console.log("get last active time returning: " + that.lastActiveTimeStamp);
                callback(that.lastActiveTimeStamp);
                return;
            });
    }

    private checkForNewMessages() {
        var messagesUrl = "/chats/" + this.newChatsWatcherGuestID + "/" + this.newChatsWatcherRoom + "/";

        var that = this;
        var onQueryEvent = function(result) {
            var newestMessageDate: Date = new Date(result.value.lastMessageTime);

            that.getLastActiveTime((lastActiveTime: Date) => {
                if(newestMessageDate.getTime() > lastActiveTime.getTime()) {
                    console.log("NEW MESSAGES!!!!");
                    that.newChatsWatcherCallback();
                }
            });
        }

        firebase.query(
        onQueryEvent,
        messagesUrl,
        {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.VALUE,
            }
        });
    }

    private callbackWrapper(data: FBData, callback: (data: FBData) => any) {
        //update last active if they can see the chat
        if(this._router.url.indexOf("Chat") !== -1) {
            console.log("updating last active on chat!!!");
            this.updateLastActive();
        } else {
            //if they cant see the chat, update the new messages callback
            this.checkForNewMessages();
        }
        callback(data);
    }

    private updateLastActive() {
        this.lastActiveTimeStamp = new Date();
        console.log("Updating Last Active Timestamp: " + this.lastActiveTimeStamp);
        //write the timestamp to phone storage
        fs.knownFolders.documents().getFile("lastActive").writeText(this.lastActiveTimeStamp.toString());
    }

}

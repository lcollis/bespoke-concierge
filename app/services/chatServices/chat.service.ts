import { Injectable } from '@angular/core';
import { Chat } from "./chat";
import { Message } from "./message";
import { FBData, PushResult } from "nativescript-plugin-firebase";
import { Router } from "@angular/router";
import firebase = require("nativescript-plugin-firebase");
import fs = require("file-system");

@Injectable()
export class ChatService {

    constructor(private _router: Router) { }

    selectedChatUserID: string;
    lastActiveTimeStamp: Date;

    private newChatsWatcherGuestID: string;
    private newChatsWatcherRoom: string;
    private newChatsWatcherCallback: (newMessages: boolean) => any;


    sendMessage(message: Message, senderID: string, room: string): Promise<PushResult> {
        this.updateLastActive();

        var messagesUrl = "/messages/" + senderID + "/" + room;

        var chat: Chat = { room: room, lastMessageTime: message.timeStamp, guestID: senderID };
        var chatsUrl = "/chats/" + senderID + "/" + room;

        firebase.setValue(chatsUrl, chat);
        return firebase.push(messagesUrl, message);
    }

    subscribeToMessages(senderID: string, room: string, callBack: (data: FBData) => any) {
        var messagesUrl = "/messages/" + senderID + "/" + room;
        firebase.addValueEventListener((data: FBData) => this.callbackWrapper(data, callBack), messagesUrl);
    }

    getListOfChats(callBack: (data: FBData) => any) {
        var chatsUrl = "/chats";
        firebase.addValueEventListener((data: FBData) => this.callbackWrapper(data, callBack), chatsUrl);
    }

    subscribeToNewMessagesCallback(guestID: string, room: string, callback: (newMessages: boolean) => void) {
        this.newChatsWatcherGuestID = guestID;
        this.newChatsWatcherRoom = room;
        this.newChatsWatcherCallback = callback;

        this.checkForNewMessages();

        //add a dummy messages subscription so that even if the user
        //doesnt look at the messages the ui still updates when they
        //get a new message inside the app
        this.subscribeToMessages(guestID, room, () => { });
    }

    getLastActiveTime(callback: (date: Date) => any) {
        var that = this;
        //get the active time from the phone storage
        fs.knownFolders.documents().getFile("lastActive").readText()
            .then((text: string) => {
                var date = new Date(text);

                //check if theyre both blank. If so, congrats its the first time in the app. return new date(0)
                if (text === "" && that.lastActiveTimeStamp === undefined) {
                    console.log("No last active timestamp recorded on phone! Should only happen on fresh installs!!!");
                    that.lastActiveTimeStamp = new Date(0);
                    fs.knownFolders.documents().getFile("lastActive").writeText(that.lastActiveTimeStamp.toString());
                    callback(that.lastActiveTimeStamp);
                    return;
                }

                //check if this.lastActiveTimeStamp is blank. if so, set it and return it
                if (that.lastActiveTimeStamp === undefined) {
                    that.lastActiveTimeStamp = date;
                    callback(that.lastActiveTimeStamp);
                    return;
                }

                //return the sooner of this.lastActiveTimestamp and the one from the file
                if (date.getTime() > that.lastActiveTimeStamp.getTime()) {
                    that.lastActiveTimeStamp = date;
                }
                console.log("get last active time returning: " + that.lastActiveTimeStamp);
                callback(that.lastActiveTimeStamp);
                return;
            });
    }

    chatHasNewMessages(chat: string, callback: (hasNewMessages: boolean) => any) {
        //get the last active time for the chat
        fs.knownFolders.documents().getFile(chat).readText()
            .then((text: string) => {
                if (text === "") {
                    //no past date stored. default to new date(0);
                    var date = new Date(0);
                } else {
                    var date = new Date(text);
                }
                console.log("last update date: " + date);
                //see if there is a newer message
                this.checkChatForNewMessages(date, chat, "default", (newMessages: boolean) => {
                    callback(newMessages);
                });
            });
    }

    private checkForNewMessages() {
        if (this.newChatsWatcherGuestID !== "") {
            this.getLastActiveTime((lastActiveTime: Date) => {
                this.checkChatForNewMessages(lastActiveTime, this.newChatsWatcherGuestID, this.newChatsWatcherRoom, this.newChatsWatcherCallback);
            });
        } else {
            this.checkAllChatsForNewMessages(this.newChatsWatcherCallback);
        }

    }

    private checkChatForNewMessages(lastActive: Date, userID: string, room: string, callback: (newMessages: boolean) => any) {
        var messagesUrl = "/chats/" + userID + "/" + room + "/";
        var onQueryEvent = function (result) {
            var newestMessageDate: Date = new Date(result.value.lastMessageTime);

            if (newestMessageDate.getTime() > lastActive.getTime()) {
                console.log("NEW MESSAGES!!!!");
                callback(true);
            } else {
                callback(false);
            }
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

    private checkAllChatsForNewMessages(callback: (newMessages: boolean) => any) {
        var messagesUrl = "/chats/";
        var that = this;
        var onQueryEvent = function (result) {
            var guestChats = result.value;
            for (var key in guestChats) {
                var chatObject = guestChats[key];
                var chat = chatObject["default"];
                
                that.chatHasNewMessages(chat.guestID, (hasNewMessages: boolean) => {
                    if(hasNewMessages) {
                        callback(true);
                        return;
                    }  
                });
            }

            callback(false);
            return;
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
        var url = this._router.url;
        if (url.indexOf("Chat") !== -1) {
            console.log("updating last active on chat!!!");

            //if staff or owner, also check if in a chat and update that chat time
            if (url.indexOf("Guest") === -1) {
                //is staff or owner
                if (url.indexOf("Selector") !== -1) {
                    //in a chat selector, do the normal things
                    this.updateLastActive();
                } else {
                    //in a chat. update the chat last active time and then do the normal thing
                    this.updateChatLastActive();
                    this.updateLastActive();
                }
            } else {
                //guest. do the normal thing
                this.updateLastActive();
            }
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
        this.checkForNewMessages();
    }

    private updateChatLastActive() {
        var lastActive = new Date();
        console.log("Updating Last Active Timestamp: " + lastActive + " for chat: " + this.selectedChatUserID);
        //write the timestamp to phone storage
        fs.knownFolders.documents().getFile(this.selectedChatUserID).writeText(lastActive.toString());
    }

}

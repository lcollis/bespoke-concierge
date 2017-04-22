import { Injectable } from '@angular/core';
import { ChatMetadata } from "./chatMetadata";
import { Chat } from "./chat";
import { Message } from "./message";
import { FBData } from "nativescript-plugin-firebase";
import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class ChatDatabaseAdapter {
    allChatsCallback: (metadata: ChatMetadata[]) => any;
    chatCallback: (chat: Chat[]) => any;

    subscribeToAllChatsMetadata(callback: (metadata: ChatMetadata[]) => any) {
        var chatsUrl = "/chats"

        firebase.addValueEventListener((data: FBData) => {
            if (data.value) {
                //parse FBData into an array of Chat Metadatas and send it to the callback
                var chatsMetadata = new Array<ChatMetadata>();
                Object.keys(data.value).forEach(function (key) {
                    var metadata: ChatMetadata = new ChatMetadata(data.value[key].default);
                    chatsMetadata.push(metadata);
                });

                callback(chatsMetadata);
            }
        }, chatsUrl);
    }

    unsubscribeFromAllChatsMetadata() {

    }

    subscribeToChatMetadata(guestID: string, callback: (metadata: ChatMetadata) => any) {
        var metadataUrl = "/chats/" + guestID + "/default";

        firebase.addValueEventListener((data: FBData) => {
            if(data.value) {
                callback(new ChatMetadata(data.value));
            }
        }, metadataUrl);
    }

    unsubscribeFromchatMetadata() {

    }

    subscribeToChatMessages(guestID: string, callback: (messages: Message[]) => any) {
        var messagesUrl = "/messages/" + guestID + "/default";

        firebase.addValueEventListener((data: FBData) => {
            if(data.value) {
                //parse FBData into a chat array and send it to the callback
                var messages = [];
                Object.keys(data.value).forEach((key) => {
                    var message: Message = data.value[key];
                    messages.push(message);
                });

                callback(messages);
            }
        }, messagesUrl);
    }

    unsubscribeFromChat() {

    }

    sendMessage(metadata: ChatMetadata, message: Message) {
        var messagesUrl = "/messages/" + metadata.guestID + "/" + metadata.room;
        return firebase.push(messagesUrl, message);
    }

    updateChatMetadata(metadata: ChatMetadata) {
        var url = "/chats/" + metadata.guestID + "/" + metadata.room;
        firebase.update(url, metadata);
        console.log("updating url: " + url);
        console.log("with metadata: "+ JSON.stringify(metadata));
    }
}

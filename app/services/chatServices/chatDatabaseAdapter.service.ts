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
                Object.keys(data.value).forEach((key: string) => {
                    var metadata: ChatMetadata = new ChatMetadata(data.value[key].default);
                    metadata = this.formatChatMetadata(metadata);

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
                var metadata = this.formatChatMetadata(data.value);
                // chatsMetadata.push(this.formatMetadata(metadata));
                callback(new ChatMetadata(metadata));
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
    }

    private formatChatMetadata(metadata: ChatMetadata) {
        //format the seenByIds properly.
        //firebase stores arrays as "key": "value"
        //where key is usually indicies 0, 1, 2, ect
        //so we have to strip off the keys and just have
        //an array of the values
        if (metadata.seenByIDs) {
            var formatedMetadata = new ChatMetadata(metadata);
            formatedMetadata.seenByIDs = [];
            Object.getOwnPropertyNames(metadata.seenByIDs)
                .map((key: string) => {
                    if (key != "length") {
                        formatedMetadata.seenByIDs.push(metadata.seenByIDs[key]);
                    }
                });

            return formatedMetadata;
        } else {
            //no seen by IDs
            metadata.seenByIDs = [];
            return metadata;
        }
    }
}

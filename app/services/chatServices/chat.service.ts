import { Injectable } from '@angular/core';
import { Chat } from "./chat";
import { Message } from "./message";
import { FBData, PushResult } from "nativescript-plugin-firebase";
import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class ChatService {

    selectedChatUserID: string;

    sendMessage(text: string, senderID: string, room: string): Promise<PushResult> {
        var message: Message = { text: text, sender: senderID, timeStamp: Date.now() };
        var messagesUrl = "/messages/" + senderID + "/" + room;

        console.log("+++++++++++++++++++++ sending message: " + JSON.stringify(message));
        
        var chat: Chat = { room: room, lastMessageTime: message.timeStamp, guestID: senderID };
        var chatsUrl = "/chats/" + senderID + "/" + room;

        firebase.setValue(chatsUrl, chat);
        return firebase.push(messagesUrl, message);
    }

    subscribeToMessages(senderID: string, room: string, callBack: (data: FBData) => any) {
        var messagesUrl = "/messages/" + senderID + "/" + room;
        firebase.addValueEventListener(callBack, messagesUrl);

        console.log("Subscribed to messages at url: " + messagesUrl);
    }

    getListOfChats(callBack: (data:FBData) => any) {
        var chatsUrl = "/chats";
        firebase.addValueEventListener(callBack, chatsUrl);
    }
}
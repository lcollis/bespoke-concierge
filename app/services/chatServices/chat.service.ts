import { Injectable } from '@angular/core';
import { Chat } from "./chat";
import { Message } from "./message";
import { FBData, PushResult } from "nativescript-plugin-firebase";
import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class ChatService {

    sendMessage(text: string, senderID: string, room: string): Promise<PushResult> {
        var message: Message = { text: text, sender: senderID, timeStamp: new Date() };
        var messagesUrl = "/messages/" + senderID + "/" + room;

        console.log("+++++++++++++++++++++ sending message: " + JSON.stringify(message));
        
        var chat: Chat = { room: room, lastMessageTime: message.timeStamp };
        var chatsUrl = "/chats/" + senderID + "/" + room;

        firebase.push(chatsUrl, chat);
        return firebase.push(messagesUrl, message);
    }

    subscribeToMessages(senderID: string, room: string, callBack: (data: FBData) => any) {
        var messagesUrl = "/messages/" + senderID + "/" + room;
        firebase.addValueEventListener(callBack, messagesUrl);

        console.log("Subscribed to messages at url: " + messagesUrl);
    }
}
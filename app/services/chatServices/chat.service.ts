import { Injectable } from '@angular/core';
import { Chat } from "./chat";
import { Message } from "./message";
import { FBData, PushResult } from "nativescript-plugin-firebase";
import { Router } from "@angular/router";
import firebase = require("nativescript-plugin-firebase");
import fs = require("file-system");

@Injectable()
export class ChatService {

    selectedChatUserID: string;
    selectedChatData: FBData;
    selectedChatHasNewMessages: boolean;

    constructor(private _router: Router) { }

    //Subscribe to Messages
    //1. set the selected chat userID
    //2. sets up this.selectedChatHasNewMessages
    //3. if there is no firebase chat subscription already, make one for the inputted chat
    //4. if the inputted chat is already subscribed to, do nothing
    //5. if there is already a subscribed chat that is different from the inputted chat,
    //    clear selectedChatData, and
    //    close the old subscribed chat, and subscribe to the new chat
    //6. calls the onConnectedCallback when connected to the chat, indicating that it is safe for the caller to use the selected chat data
    subscribeToMessages(userID: string, room: string, onConnectedCallback: () => any) {

    }

    //Send Message
    //sends the message to the given chat
    sendMessage(message: Message, senderID: string, room: string): Promise<PushResult> {
        return null;
    }

    //New Chat Data
    //new chat data from firebase
    //1. put it in this.selectedChatData
    //2. recheck if there is unread messages
    private newChatData(data: FBData) {
        this.selectedChatData = data;
    }

    //Check if Messages are Unread
    //handles checking if messages are unread, and updating this.selectedChatHasNewMessages
    private checkIfMessagesAreUnread() {

    }
}

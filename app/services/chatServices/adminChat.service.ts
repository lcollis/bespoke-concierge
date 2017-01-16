import { Injectable } from '@angular/core';
import { Chat } from "./chat";
import { ChatService } from "./chat.service";
import { Message } from "./message";
import { FBData, PushResult } from "nativescript-plugin-firebase";
import firebase = require("nativescript-plugin-firebase");
import fs = require("file-system");

@Injectable()
export class AdminChatService extends ChatService {
    listOfChats: FBData;

    //Does a one time call to get the list of chats from firebase
    getListOfChats(callBack: (data: FBData) => any) {

    }

    //Checks if the chat has new message
    chatHasNewMessages(chat: string, callback: (hasNewMessages: boolean) => any) {

    }
}

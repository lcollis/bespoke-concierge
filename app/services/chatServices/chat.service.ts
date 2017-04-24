import { Injectable, NgZone } from '@angular/core';
import { Chat } from "./chat";
import { ChatDatabaseAdapter } from "./chatDatabaseAdapter.service";
import { Message } from "./message";
import { ChatMetadata } from "./chatMetadata";

class CallbackData {
    callback: (any) => any;
    thisValue: any;
    canSeeChats: boolean;

    constructor(callback: (any) => any, thisValue: any, canSeeChats: boolean) {
        this.callback = callback;
        this.thisValue = thisValue;
        this.canSeeChats = canSeeChats;
    }
}

@Injectable()
export class ChatService {
    chat: Chat = new Chat();
    loadingMessages: boolean = true;

    private connectedToChat: boolean = false;
    private gotMetadata: boolean = false;


    private callbackList: CallbackData[] = [];

    constructor(private _chatDatabaseAdapter: ChatDatabaseAdapter, private _ngZone: NgZone) { }

    connectToChatWithGuestID(userID: string, guestID: string, onNewMessagesCallback: (any) => any, callbackThis: any, canSeeChats: boolean) {
        if (this.connectedToChat == false) {
            this.connectedToChat = true;

            //add the callback to the list
            this.callbackList.push(new CallbackData(onNewMessagesCallback, callbackThis, canSeeChats));

            //set the chat metadatas guestID to the right guestID while the real metadata loads
            this.chat.metadata.guestID = guestID;

            //subscribe to the chat
            this._chatDatabaseAdapter.subscribeToChatMessages(guestID,
                (messages: Message[]) => {
                    //run in ngzone so that the data is updated in the view
                    this._ngZone.run(() => {
                        //take in the messages
                        this.chat.messages = this.sortChatMessages(messages);
                        this.loadingMessages = false;

                        //tell the views there are new messages
                        this.callbackList.map((callbackData: CallbackData) => {
                            callbackData.callback.call(callbackData.thisValue);
                        });

                        this.seeMessages(userID);
                    });
                });

            //subscribe to the chat metadata
            this._chatDatabaseAdapter.subscribeToChatMetadata(guestID,
                (metadata: ChatMetadata) => {
                    //run in ngzone so that the data is updated in the view
                    this._ngZone.run(() => {
                        this.gotMetadata = true;
                        this.chat.metadata = metadata;

                        this.seeMessages(userID);
                    });
                });
        } else {
            // already connected to chat, so just add another callback to the list
            this.callbackList.push(new CallbackData(onNewMessagesCallback, callbackThis, canSeeChats));
            this.seeMessages(userID);

            //if we have the messages, just call the callback because the messages are
            //new to the this callback
            if(!this.loadingMessages) {
                onNewMessagesCallback.call(callbackThis);
            }
        }
    }

    sendMessage(message: Message) {
        //update the chat metadata in firebase
        this.chat.metadata.lastMessageTime = Math.max(this.chat.metadata.lastMessageTime, message.timeStamp);
        this.chat.metadata.resetSeenByIDs();
        this.chat.metadata.addSeenByID(message.sender);

        this._chatDatabaseAdapter.updateChatMetadata(this.chat.metadata);

        this._chatDatabaseAdapter.sendMessage(this.chat.metadata, message);
    }

    unseenMessages(userID: string): boolean {
        if (this.gotMetadata) {
            return !this.chat.metadata.hasBeenSeenByID(userID);
        }
        return false;
    }

    disconnectCallback(thisValue: any) {
        for (var i = 0; i < this.callbackList.length; i++) {
            if (this.callbackList[i].thisValue == thisValue) {
                this.callbackList.splice(i, 1);
            }
        }
    }

    private seeMessages(userID: string) {

        //if you can see the new messages, and theyre marked unread, mark it as seen
        if (this.canSeeMessages() && !this.chat.metadata.hasBeenSeenByID(userID)) {
            this.chat.metadata.addSeenByID(userID);
            this._chatDatabaseAdapter.updateChatMetadata(this.chat.metadata);
        }
    }

    private sortChatMessages(messages: Message[]): Message[] {
        messages.sort((a: Message, b: Message) => {
            return a.timeStamp - b.timeStamp;
        });

        return messages;
    }

    private canSeeMessages(): boolean {
        for(var i = 0; i < this.callbackList.length; i++) {
            if(this.callbackList[i].canSeeChats) {
                return true;
            }
        }
        return false;
    }
}

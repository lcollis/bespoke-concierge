import { Injectable, NgZone } from '@angular/core';
import { Chat } from "./chat";
import { ChatDatabaseAdapter } from "./chatDatabaseAdapter.service";
import { Message } from "./message";
import { ChatMetadata } from "./chatMetadata";

@Injectable()
export class ChatService {
    chat: Chat = new Chat();
    loadingMessages: boolean = true;

    private connectedToChat: boolean = false;
    private gotMetadata: boolean = false;

    private callbackList: ((any) => any)[] = [];
    private callbackThisValues: any[] = [];

    constructor(private _chatDatabaseAdapter: ChatDatabaseAdapter, private _ngZone: NgZone) { }

    connectToChatWithGuestID(guestID: string, onNewMessagesCallback: (any) => any, callbackThis: any) {
        if (this.connectedToChat == false) {
            this.connectedToChat = true;

            //add the callback to the list
            this.callbackList.push(onNewMessagesCallback);
            this.callbackThisValues.push(callbackThis);

            //set the chat metadatas guestID to the right guestID while the real metadata loads
            this.chat.metadata.guestID = guestID;

            //subscribe to the chat
            this._chatDatabaseAdapter.subscribeToChatMessages(guestID,
                (messages: Message[]) => {
                    //run in ngzone so that the data is updated in the view
                    this._ngZone.run(() => {
                        this.chat.messages = this.sortChatMessages(messages);
                        this.loadingMessages = false;

                        this.callbackList.map((callback: (any) => any, index) => {
                            callback.call(this.callbackThisValues[index]);
                        });
                    });
                });

            //subscribe to the chat metadata
            this._chatDatabaseAdapter.subscribeToChatMetadata(guestID,
                (metadata: ChatMetadata) => {
                    //run in ngzone so that the data is updated in the view
                    this._ngZone.run(() => {
                        this.gotMetadata = true;
                        this.chat.metadata = metadata;
                    });
                });
        } else {
            // already connected to chat, so just add another callback to the list
            this.callbackList.push(onNewMessagesCallback);
            this.callbackThisValues.push(callbackThis);
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
        var index = this.callbackThisValues.indexOf(thisValue);
        this.callbackList.splice(index, 1);
        this.callbackThisValues.splice(index, 1);
    }

    private sortChatMessages(messages: Message[]): Message[] {
        messages.sort((a: Message, b: Message) => {
            return a.timeStamp - b.timeStamp;
        });

        return messages;
    }
}

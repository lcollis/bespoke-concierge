import { Injectable, NgZone } from '@angular/core';
import { ChatMetadata } from "./chatMetadata";
import { ChatDatabaseAdapter } from "./chatDatabaseAdapter.service";

@Injectable()
export class ChatListService {
    chats: ChatMetadata[];
    loadingMessages: boolean = true;
    selectedChatUserID: string;

    constructor(private _chatDatabaseAdapter: ChatDatabaseAdapter, private _ngZone: NgZone) {
        this._chatDatabaseAdapter.subscribeToAllChatsMetadata(
            (metadata: ChatMetadata[]) => {
                //run in ngzone so that the data is updated in the view
                this._ngZone.run( () => {
                    this.chats = this.sortChatMetadata(metadata);
                    this.loadingMessages = false;
                });
        });
    }

    unseenMessages(userID: string): boolean {
        if(this.chats) {
            for(var i = 0; i < this.chats.length; i++) {
                if(!this.chats[i].hasBeenSeenByID(userID)) {
                    return true;
                }
            }
        }
        return false;
    }

    private sortChatMetadata(metadata: ChatMetadata[]) {
        return metadata.sort((a: ChatMetadata, b: ChatMetadata) => {
            return b.lastMessageTime - a.lastMessageTime;
        });
    }
}

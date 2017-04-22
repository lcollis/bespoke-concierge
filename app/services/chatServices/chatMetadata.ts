export class ChatMetadata {
    guestID: string;
    room: string;

    lastMessageTime: number;
    seenByIDs: string[];

    constructor(chatMetadata: ChatMetadata) {
        this.lastMessageTime = chatMetadata.lastMessageTime;
        this.guestID = chatMetadata.guestID;
        this.room = chatMetadata.room;
        this.seenByIDs = chatMetadata.seenByIDs || [];
    }

    resetSeenByIDs() {
        this.seenByIDs = [];
    }

    addSeenByID(seenByID: string) {
        if(!this.hasBeenSeenByID(seenByID)) {
            this.seenByIDs.push(seenByID);
        }
    }

    hasBeenSeenByID(id: string): boolean {
        return this.seenByIDs.indexOf(id) != -1;
    }
}

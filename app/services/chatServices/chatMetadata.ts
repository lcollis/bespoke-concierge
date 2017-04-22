export class ChatMetadata {
    guestID: string;
    room: string;

    lastMessageTime: number;
    seenByIDs: string[];

    constructor(chatMetadata?: ChatMetadata) {

        if(chatMetadata) {
            this.lastMessageTime = chatMetadata.lastMessageTime || 0;
            this.guestID = chatMetadata.guestID || "";
            this.room = chatMetadata.room || "default";
            this.seenByIDs = chatMetadata.seenByIDs || [];
        } else {
            this.lastMessageTime = 0;
            this.guestID = "";
            this.room = "default";
            this.seenByIDs = [];
        }
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

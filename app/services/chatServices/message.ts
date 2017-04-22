export class Message {
    text: string;
    timeStamp: number;
    senderID: string;

    constructor(text: string, timeStamp: number, senderID: string) {
        this.text = text;
        this.timeStamp = timeStamp;
        this.senderID = senderID;

        return this;
    }
}

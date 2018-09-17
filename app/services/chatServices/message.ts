export class Message {
    text: string;
    timeStamp: number;
    sender: string;

    constructor(text: string, timeStamp: number, senderID: string) {
        this.text = text;
        this.timeStamp = timeStamp;
        this.sender = senderID;

        return this;
    }
}

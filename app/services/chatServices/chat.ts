import { Message } from "./message";
import { ChatMetadata } from "./chatMetadata";

export class Chat {
    messages: Message[];
    metadata: ChatMetadata;

    constructor() {
        this.messages = [];
        this.metadata = new ChatMetadata();
    }
}

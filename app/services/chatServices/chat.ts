import {Message} from "./message";

export class Chat {
    id: string;
    messages: Message[];
    lastMessageTime: Date;
}
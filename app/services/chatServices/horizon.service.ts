import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable'
import fs = require("file-system");
import {Message} from "./message";
import {Chat} from "./chat";
var Horizon = require('@horizon/client/dist/horizon-dev');
const SERVER_URL = require("../chatServerUrl").url;

@Injectable()
export class HorizonService {
    private horizon;
    chats;
    userID: string; //id for every user so we can tell who is who

    constructor() {
        //show server status
        this.horizon = new Horizon({ host: SERVER_URL });

        this.horizon.onReady()
            .subscribe(status => { console.log(status.type) })

        this.horizon.onDisconnected()
            .subscribe(status => { console.log(status.type) })

        this.horizon.onSocketError()
            .subscribe(status => { console.log(status.type) })

        //get userID or make one if it doesn't exist
        var that = this;
        this.getUserID()
            .then(function (content) {
                that.userID = content;
            }, function (error) {
                console.log("Error getting user ID in horizon.service.ts")
                console.log(error);
            });

        this.connectToChats();

    }

    connectToChats() {
        this.chats = this.horizon('chats');
    }

    getAllChats(): Observable<Chat[]> {
        return this.chats.watch();
    }

    getMessages(): Observable<Chat> {
        var id = this.userID;
        return this.chats.find({ id: id }).watch();
    }

    sendMessages(messages: Message[]) {
        var id = this.userID;
        return this.chats
            .upsert({
                id: id,
                messages: messages,
                lastMessageTime: new Date()
            } as Chat);
    }

    getStatus() {
        return this.horizon.status();
    }

    disconnect() {
        this.horizon.disconnect();
    }

    getUserID(): Promise<string> {

        var documentsFolder: fs.Folder = fs.knownFolders.documents();

        if (documentsFolder.contains("userID.txt")) {            
            var userIDFile = documentsFolder.getFile("userID.txt");

            return userIDFile.readText();

        } else {
            console.log("+++++++++++++++++++++++User ID does not exist");
            var userIDFile = documentsFolder.getFile("userID.txt");
            var that = this;
            return userIDFile.writeText(this.generateNewUserID())
                .then(function () {
                    return userIDFile.readText();
                }, function (error) {
                    console.log(error);
                });
        }
    }

    generateNewUserID(): string {
        console.log("!!!!!!!!!!!!!!!!!making a new user ID. This should only happen once per phone");
        return '_id' + (new Date()).getTime(); //will be unique unless we make them directly one after another
    }

}

import { Injectable } from '@angular/core';
import fs = require("file-system");

@Injectable()
export class UserIdService {

    private userId: string;

    getUserId(): Promise<string> {
        if(this.userId) {
            return Promise.resolve(this.userId);
        } else {
            var userIdFilePath = fs.path.join(fs.knownFolders.documents().path, "userID.txt");
            if(fs.File.exists(userIdFilePath)) {
                return this.getIdFromStorage();
            } else {
                this.userId = this.makeNewId();
                this.storeId();
                return Promise.resolve(this.userId);
            }
        }
    }

    private getIdFromStorage(): Promise<string> {
        var file = fs.knownFolders.documents().getFile("userID.txt");
        return file.readText();
    }

    private storeId() {
        var file = fs.knownFolders.documents().getFile("userID.txt");
        file.writeText(this.userId)
            .then((value: any) => console.log("userID stored on phone"))
            .catch((error: any) => console.log("Error storing userID on phone: " + error));
    }

    private makeNewId(): string {
        console.log("Making a new user ID. This should only happen once per install");
        return '_id' + (new Date()).getTime(); //will be unique unless we make them directly one after another
    }
}
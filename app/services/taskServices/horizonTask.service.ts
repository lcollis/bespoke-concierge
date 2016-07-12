import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Task} from "./task";
import fs = require("file-system");
var Horizon = require('@horizon/client/dist/horizon-dev');
const SERVER_URL = "10.0.3.2:8181";

@Injectable()
export class HorizonTaskService {

    private horizon;
    tasksDatabase;

    constructor() {
        //show server status
        this.horizon = new Horizon({ host: SERVER_URL });

        this.horizon.onReady()
            .subscribe(status => { console.log(status.type) })

        this.horizon.onDisconnected()
            .subscribe(status => { console.log(status.type) })

        this.horizon.onSocketError()
            .subscribe(status => { console.log(status.type) })

        this.connectToTasks();
    }

    connectToTasks() {
        this.tasksDatabase = this.horizon('tasks');
    }

    getUsersTasks(userID: string)  { //: Observable<Task[]> {
        console.log("+++++++++++++finding tasks for user: " + userID);
        return this.tasksDatabase.findAll({requesterID: userID}).watch();
    }

    getAllTasks(): Observable<Task[]> {
        return this.tasksDatabase.watch();
    }

    addTask(task: Task) {
        return this.tasksDatabase.store(task);
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
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
var fs = require("file-system");

export class AppTexts {
    serverError: string;
    chatError: string;
    dinnerReservationConfirmation: string;
    calendarReservationConfirmation: string;
    afterHoursRequestConfirmation: string;
    requestError: string;
    requestConfirmation: string;
    tripAdvisorText: string;
}

@Injectable()
export class TextService {

    static defaults: AppTexts = {
        "serverError": "There was an error connecting to the server. Please check your internet connection and try again",
        "chatError": "There was an error connecting to the chat server. Please check your internet connection and try again",
        "dinnerReservationConfirmation": "We are making your reservation! Expect a message from us in a few minutes with details, and feel free to message us first with any changes!",
        "calendarReservationConfirmation": "Successfully reserved! You can find your reserved events in the Itinerary",
        "afterHoursRequestConfirmation": "Request Sent! It's past 9pm so we may wait to make your request until tomorrow morning, but feel free to message us with any changes in the meantime!",
        "requestError": "There was an error connecting to the server and your request information could not be sent. Please check your internet connection and try again, or call the front desk.",
        "requestConfirmation": "Request Sent! Expect a message from us in a few minutes with details, and feel free to message us first with any changes!",
        "tripAdvisorText": "Good reviews are the best way to say thank you!",
    };
    
    private filename = "text.txt";

    private texts: AppTexts;

    constructor(private _databaseService: DatabaseService) {
        //try and get the text from the server, and if it doesnt work try to get it from the file system and if not then use defaults
        this._databaseService.getApiData("Text").subscribe(
                (data) => {
                    console.log("Got text data from server: " + data);
                    if(data) {
                        this.texts = data;
                        this.storeTextOnPhone();
                    } else {
                        console.log("Server returned null. Will try and get the text from phone storage");
                        this.getTextFromPhone();
                    }
                }, (error) => {
                    console.log("Error getting text from server with error: " + error);
                    this.getTextFromPhone();
                });
    }

    getText(): AppTexts {
        if(this.texts) {
            return this.texts;
        } else {
            console.log("texts was null, returning the defaults");
            return TextService.defaults;
        }
    }

    private getTextFromPhone() {
        console.log("Trying to get the text from phone storage");
        var documentsFolder = fs.knownFolders.documents();
        var textFile = documentsFolder.getFile(this.filename);
        textFile.readText()
            .then((text) => {
                console.log("Got text service text from file: " + text);
                if(text) {
                    this.texts = text;
                } else {
                    console.log("text was null. Using defaults");
                    this.texts = TextService.defaults;
                }
            }, (error) => {
                console.log("Error reading the text service text file. Using defaults");
                this.texts = TextService.defaults;
            });
    }

    private storeTextOnPhone() {
        var documentsFolder = fs.knownFolders.documents();
        var textFile = documentsFolder.getFile(this.filename);
        textFile.writeText(this.texts)
            .then(() => {
                console.log("successfully saved text to phone storage");
            }, (error) => {
                console.log("Error saving text to phone storage: " + error);
            });
    }
}

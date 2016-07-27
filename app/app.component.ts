import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS } from "nativescript-angular/router";

import fs = require("file-system");
import firebase = require("nativescript-plugin-firebase");

@Component({
    selector: 'app',
    template: `
        <page-router-outlet></page-router-outlet>
    `,
    directives: [NS_ROUTER_DIRECTIVES]
})

export class AppComponent {

    ngOnInit() {
        console.log("Trying to load firebase");
        firebase.init({
            persist: true,

        }).then(
            (instance) => {
                console.log("firebase.init done");
            },
            (error) => {
                console.log("firebase.init error: " + error);
            });

        var that = this;
        firebase.addOnPushTokenReceivedCallback(
            function (token) {
                console.log("Firebase push token: " + token);

                //store the push token on the phone storage
                var documentsFolder: fs.Folder = fs.knownFolders.documents();
                var userPushTokenFile = documentsFolder.getFile("userPushToken.txt");
                userPushTokenFile.writeText(token)
                    .then(function () {
                        console.log("successfully stored pushToken on device");
                    }).catch(function (error) {
                        console.log("Error storing push token on device");
                        console.log(error);
                    });
            });

        firebase.addOnMessageReceivedCallback(
            function (message) {
                console.log("Title: " + message.title);
                console.log("Body: " + message.body);
            });
    }
}
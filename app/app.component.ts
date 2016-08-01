import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS, RouterExtensions} from "nativescript-angular/router";
import {Page} from "ui/page";
import fs = require("file-system");
import firebase = require("nativescript-plugin-firebase");

var application = require("application");

@Component({
    selector: 'app',
    templateUrl: "app.html",
    directives: [NS_ROUTER_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class AppComponent {

    constructor(page: Page, _routerExtensions: RouterExtensions) {
        page.actionBarHidden = true;

        //fix the android back button just quitting everything
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent,
                (args) => {
                    console.log("router url: " + _routerExtensions.router.url);
                    if (_routerExtensions.router.url !== "/Home" && _routerExtensions.router.url !== "/") {
                        _routerExtensions.back();
                        args.cancel = true;
                    }
                })
        }
    }

    ngOnInit() {
        console.log("Trying to load firebase");
        firebase.init({
            persist: false
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
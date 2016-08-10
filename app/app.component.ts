import { Component, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS, RouterExtensions} from "nativescript-angular/router";
import {registerElement} from "nativescript-angular/element-registry";
import {Page} from "ui/page";
import fs = require("file-system");
import firebase = require("nativescript-plugin-firebase");
import { Color } from "color";

var application = require("application");
var orientationModule = require("nativescript-screen-orientation");

@Component({
    selector: 'app',
    template: "<page-router-outlet></page-router-outlet>",
    directives: [NS_ROUTER_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class AppComponent {

    constructor(page: Page, _routerExtensions: RouterExtensions, ngZone: NgZone) {
        page.actionBarHidden = true;

        //fix the android back button just quitting everything
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent,
                (args) => {
                    var url = _routerExtensions.router.url;
                    //if not on a homescreen or the login page (all homescreen urls have home in the url)
                    if (url.search("Home") === -1 && url !== "/Login") {
                        //cancel the default android back button behavior (going back a screen or quitting the app)
                        args.cancel = true;

                        //if user is in the guest screen
                        if (url.search("GuestScreen") !== -1) {
                            _routerExtensions.navigate(['/GuestScreen/Home']);
                        }

                        //if user is in the staff screen
                        if (url.search("StaffScreen") !== -1) {
                            //use ngzone so angular can see the navigation. Otherwise the listview is empty
                            ngZone.run(() => {
                                _routerExtensions.navigate(['/StaffScreen/Home']);
                            });
                        }
                    }
                })
        }

        //allows for ios statusbar coloring
        page.backgroundSpanUnderStatusBar = true;
        page.backgroundColor = new Color("lightblue");
        try {
            registerElement("StatusBar", () => require("nativescript-statusbar").StatusBar);
        } catch (error) { }
    }

    ngOnInit() {
        //lock screen orientation
        orientationModule.setCurrentOrientation("portrait", function () {
            console.log("portrait orientation set");
        });
        //config firebase
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
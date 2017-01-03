import { Component, NgZone } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import {registerElement} from "nativescript-angular/element-registry";
import { ChatService } from "./services/chatServices/chat.service";
import { UserIdService } from "./services/userId.service";
import {Page} from "ui/page";
import { Color } from "color";
import firebase = require("nativescript-plugin-firebase");
import fs = require("file-system");

var application = require("application");

@Component({
    selector: "my-app",
    template: "<page-router-outlet></page-router-outlet>",
    providers: [ChatService, UserIdService]
})
export class AppComponent {
    private pushToken = null;

    constructor(page: Page, _routerExtensions: RouterExtensions, private _userIdService: UserIdService, ngZone: NgZone) {
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

                        //if user is in the owner screen
                        if (url.search("OwnerScreen") !== -1) {
                            //use ngzone so angular can see the navigation. Otherwise the listview is empty
                            ngZone.run(() => {
                                _routerExtensions.navigate(['/OwnerScreen/Home']);
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

        //config firebase
        firebase.init({
            persist: false
        }).then(
            (instance) => { },
            (error) => {
                console.log("firebase.init error: " + error);
            });

        var that = this;
        firebase.addOnPushTokenReceivedCallback(
            function (token) {
                console.log("Firebase push token: " + token);
                that.pushToken = token;

                //store the push token on the server
                that.storePushTokenOnServer();

                //store the push token on the phone storage
                var documentsFolder: fs.Folder = fs.knownFolders.documents();
                var userPushTokenFile = documentsFolder.getFile("userPushToken.txt");
                userPushTokenFile.writeText(token)
                    .then(function () {
                        console.log("successfully stored pushToken on device: " + token);
                    }).catch(function (error) {
                        console.log("Error storing push token on device");
                        console.log(error);
                    });
            });

        firebase.addOnMessageReceivedCallback(
            function (message) {
                console.log("Message: " + JSON.stringify(message));
            });

        this.makeSurePushTokenIsOnServer();
    }


    storePushTokenOnServer() {
        this._userIdService.getUserId()
            .then((userID) => {
                firebase.setValue("/pushTokens", { [userID]: this.pushToken });
                console.log("Stored push token on server: " + this.pushToken);
            });
    }

    makeSurePushTokenIsOnServer() {
        //just push the token to the server every time just to make sure its up there
        var that = this;
        this.getPushTokenFromPhoneStorage()
        .then((token) => {
            that.pushToken = token;
            that.storePushTokenOnServer();
        });
    }

    getPushTokenFromPhoneStorage(): Promise<string> {
        var documentsFolder: fs.Folder = fs.knownFolders.documents();
        var userPushTokenFile = documentsFolder.getFile("userPushToken.txt");
        return userPushTokenFile.readText();
    }
}

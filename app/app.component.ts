import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS } from "nativescript-angular/router";

//horizon and filesystem things for push token and userID
import {HorizonService} from "./services/chatServices/horizon.service";
import fs = require("file-system");
var Horizon = require('@horizon/client/dist/horizon-dev');
const SERVER_URL = require("./services/chatServerUrl").url;



import firebase = require("nativescript-plugin-firebase");

@Component({
    selector: 'app',
    template: `
        <page-router-outlet></page-router-outlet>
    `,
    directives: [NS_ROUTER_DIRECTIVES],
    providers: [HorizonService]
})

export class AppComponent {

    constructor(private hzService: HorizonService) { }

    ngOnInit() {
    //     var horizon = new Horizon({ host: SERVER_URL });
    //     var userList = horizon('userPushID');

    //     console.log("Trying to load firebase");
    //     firebase.init({}).then(
    //         (instance) => {
    //             console.log("firebase.init done");
    //         },
    //         (error) => {
    //             console.log("firebase.init error: " + error);
    //         });


    //     //make sure that the users push token is stored on the server so they can get push notifications
    //     this.hzService.getUserID().then(function (userID) {
    //         console.log("got userID for server push token check");
    //         var pushTokenFile = fs.knownFolders.documents().getFile("userPushToken.txt");
    //         pushTokenFile.readText().then(function (pushToken) {
    //             if (pushToken) {
    //                 console.log("Making sure push token is on server");
    //                 userList.fetch().subscribe(
    //                     function (list: Array<any>) {
    //                         userList.upsert({ id: userID, pushToken: pushToken });
    //                         console.log("Push token successfully stored in server: " + pushToken);
    //                     }, function (error) {
    //                         console.log("Error writting push token to server");
    //                         console.log(error);
    //                     }
    //                 );
    //             }
    //         }).catch(function (error) {
    //             console.log("error getting push token from phone");
    //             console.log(error);
    //         })
    //     }).catch(function (error) {
    //         console.log("error getting userId");
    //         console.log(error);
    //     })

    //     var that = this;
    //     firebase.addOnPushTokenReceivedCallback(
    //         function (token) {
    //             console.log("Firebase push token: " + token);

    //             //store the push token on the phone storage
    //             var documentsFolder: fs.Folder = fs.knownFolders.documents();
    //             var userPushTokenFile = documentsFolder.getFile("userPushToken.txt");
    //             userPushTokenFile.writeText(token)
    //                 .then(function () {
    //                     console.log("successfully stored pushToken on device");
    //                 }).catch(function (error) {
    //                     console.log("Error storing push token on device");
    //                     console.log(error);
    //                 });

    //             //add push token and user ID to the user list on server
    //             that.hzService.getUserID().then(function (userId) {
    //                 console.log("attempting to write push token to server");

    //                 userList.fetch().subscribe(
    //                     function (list: Array<any>) {
    //                         userList.upsert({ id: userId, pushToken: token });
    //                         console.log("Push token successfully stored in server");
    //                     }, function (error) {
    //                         console.log("Error writting push token to server");
    //                         console.log(error);
    //                     }
    //                 );
    //             }, function (error) {
    //                 console.log("error getting userID from phone storage");
    //                 console.log(error);
    //             });
    //         });

    //     firebase.addOnMessageReceivedCallback(
    //         function (message) {
    //             console.log("Title: " + message.title);
    //             console.log("Body: " + message.body);
    //         });
    }
}
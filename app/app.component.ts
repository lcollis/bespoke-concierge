import { Component } from '@angular/core';
import {RouteConfig} from "@angular/router-deprecated";
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "nativescript-angular/router";
import {HorizonService} from "./services/chatServices/horizon.service";
import fs = require("file-system");
var Horizon = require('@horizon/client/dist/horizon-dev');
const SERVER_URL = require("./services/chatServerUrl").url;

import {HomeComponent} from "./pages/home/home.component";
import {OffersComponent} from "./pages/offers/offers.component";
import {OfferDetailComponent} from "./pages/offers/offerDetail/offerDetail.component";
import {HotelInfoComponent} from "./pages/hotelInfo/hotelInfo.component";
import {FaqComponent } from "./pages/faq/faq.component";
import {WeatherComponent} from "./pages/weather/weather.component";
import {TripAdvisorComponent} from "./pages/tripAdvisor/tripAdvisor.component";
import {SocialMediaComponent} from "./pages/socialMedia/socialMedia.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {RestaurantsComponent} from "./pages/restaurants/restaurants.component";
import {MenuComponent} from "./pages/menu/menu.component";
import {ChatComponent} from "./pages/chat/chat.component";
import {RequestsComponent} from "./pages/requests/requests.component";
import {AdminChatSelectorComponent} from "./pages/adminChatSelector/adminChatSelector.component";
import {AdminChatComponent} from "./pages/adminChatSelector/adminChat/adminChat.component";
import {AdminHomeComponent} from "./pages/adminHome/adminHome.component";


import firebase = require("nativescript-plugin-firebase");

@Component({
    selector: 'app',
    template: `
        <page-router-outlet></page-router-outlet>
    `,
    directives: [NS_ROUTER_DIRECTIVES],
    providers: [NS_ROUTER_PROVIDERS, HorizonService]
})


@RouteConfig([
    { path: '/Home', component: HomeComponent, name: "Home", useAsDefault: true },
    { path: '/Offers', component: OffersComponent, name: "Offers" },
    { path: '/OfferDetail', component: OfferDetailComponent, name: "OfferDetail" },
    { path: '/HotelInfo', component: HotelInfoComponent, name: "HotelInfo" },
    { path: '/Faq', component: FaqComponent, name: 'Faq' },
    { path: '/Weather', component: WeatherComponent, name: 'Weather' },
    { path: '/TripAdvisor', component: TripAdvisorComponent, name: 'TripAdvisor' },
    { path: '/SocialMedia', component: SocialMediaComponent, name: 'SocialMedia' },
    { path: '/Calendar', component: CalendarComponent, name: 'Calendar' },
    { path: '/Restaurants', component: RestaurantsComponent, name: 'Restaurants' },
    { path: '/Chat', component: ChatComponent, name: 'Chat' },
    { path: '/Menu', component: MenuComponent, name: 'Menu' },
    { path: '/Requests', component: RequestsComponent, name: 'Requests' },
    { path: '/AdminChatSelector', component: AdminChatSelectorComponent, name: 'AdminChatSelector' },
    { path: '/AdminChat', component: AdminChatComponent, name: 'AdminChat' },
    { path: '/AdminHome', component: AdminHomeComponent, name: 'AdminHome' },
])


export class AppComponent {

    constructor(private hzService: HorizonService) { }

    ngOnInit() {
        var horizon = new Horizon({ host: SERVER_URL });
        var userList = horizon('userPushID');

        console.log("Trying to load firebase");
        firebase.init({}).then(
            (instance) => {
                console.log("firebase.init done");
            },
            (error) => {
                console.log("firebase.init error: " + error);
            });


        //make sure that the users push token is stored on the server so they can get push notifications
        this.hzService.getUserID().then(function (userID) {
            var pushTokenFile = fs.knownFolders.documents().getFile("userPushToken.txt");
            pushTokenFile.readText().then(function (pushToken) {
                if (pushToken) {
                    console.log("Making sure push token is on server");
                    userList.fetch().subscribe(
                        function (list: Array<any>) {
                            userList.upsert({ id: userID, pushToken: pushToken });
                            console.log("Push token successfully stored in server");
                        }, function (error) {
                            console.log("Error writting push token to server");
                            console.log(error);
                        }
                    );
                }
            }).catch(function (error) {
                console.log("error getting push token from phone");
                console.log(error);
            })
        }).catch(function (error) {
            console.log("error getting userId");
            console.log(error);
        })

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

                //add push token and user ID to the user list on server
                that.hzService.getUserID().then(function (userId) {
                    console.log("attempting to write push token to server");

                    userList.fetch().subscribe(
                        function (list: Array<any>) {
                            userList.upsert({ id: userId, pushToken: token });
                            console.log("Push token successfully stored in server");
                        }, function (error) {
                            console.log("Error writting push token to server");
                            console.log(error);
                        }
                    );
                }, function (error) {
                    console.log("error getting userID from phone storage");
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
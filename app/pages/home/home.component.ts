import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'home',
    templateUrl: 'pages/home/home.html',
    styleUrls: ['pages/home/home.css']
})
export class HomeComponent implements OnInit {
    constructor(private _router: Router) { }

    ngOnInit() { }

    specialOffers() {
        this._router.navigate(["/Offers"]);
    }
    
    hotelInformation() {
        this._router.navigate(["/HotelInfo"]);
    }

    faq() {
        this._router.navigate(["/Faq"]);
    }

    weather() {
        this._router.navigate(["/Weather"]);
    }

    tripAdvisor() {
        this._router.navigate(["/TripAdvisor"]);
    }

    socialMedia() {
        this._router.navigate(["/SocialMedia"]);
    }

    calendar() {
        this._router.navigate(["/Calendar"]);
    }
    
    restaurants() {
        this._router.navigate(["/Restaurants"]);
    }

    menu() {
        this._router.navigate(["/Menu"]);
    }

    chat() {
        this._router.navigate(["/Chat"]);
    }

    requests() {
        this._router.navigate(["/Requests"]);
    }

    admin() {
        this._router.navigate(["/AdminHome"]);
    }
}
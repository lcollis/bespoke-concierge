import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router-deprecated";

@Component({
    selector: 'home',
    templateUrl: 'pages/home/home.html',
    styleUrls: ['pages/home/home.css']
})
export class HomeComponent implements OnInit {
    constructor(private _router: Router) { }

    ngOnInit() { }

    specialOffers() {
        this._router.navigate(["Offers"]);
    }
    
    hotelInformation() {
        this._router.navigate(["HotelInfo"]);
    }

    faq() {
        this._router.navigate(["Faq"]);
    }

    weather() {
        this._router.navigate(["Weather"]);
    }

    tripAdvisor() {
        this._router.navigate(["TripAdvisor"]);
    }

}
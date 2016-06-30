import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router-deprecated";

@Component({
    selector: 'home',
    templateUrl: 'pages/home/home.html'
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
}
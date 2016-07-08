import { Component, OnInit } from '@angular/core';
//import { OfferService } from "../../services/offer.service";
//import { Offer } from "../../services/offer";
import {Router} from "@angular/router-deprecated";

@Component({
    selector: 'restaurants',
    templateUrl: 'pages/restaurants/restaurants.html',
    styleUrls: ['pages/restaurants/restaurants.css']
})

export class RestaurantsComponent implements OnInit {

    restaurantInfo: string;

    constructor(private _router: Router) {
        this.restaurantInfo = "Testing Restaurants";
    }

    ngOnInit() {

    }

    onNavBtnTap() {
        this._router.navigate(["Home"]);
    }
}
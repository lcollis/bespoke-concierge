import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from "../../services/restaurants.service";
import {Restaurants} from "../../services/restaurants";
import {Router} from "@angular/router-deprecated";
import appModule = require("application");

@Component({
    selector: 'restaurants',
    templateUrl: 'pages/restaurants/restaurants.html',
    styleUrls: ['pages/restaurants/restaurants.css']
})

export class RestaurantsComponent implements OnInit {
    restaurant: Restaurants[];
    loading: boolean = true;

    constructor(private _router: Router, private _restaurant:RestaurantsService) {
        _restaurant.loadRestaurant().subscribe(
            restaurant => this.getRestaurant(restaurant),
            error => this.receivingError(error));
    }
  

    getRestaurant(restaurant) {
        this.restaurant = restaurant._body;
        this.loading = false;
    }

    receivingError(error) {
        console.error(error.status);
        alert("No Internet Connection");
        this._router.navigate(["Home"]);
    }

    onNavBtnTap() {
        this._router.navigate(["Home"]);
    }

    ngOnInit() { }
}

import { Injectable } from '@angular/core';
import {Restaurants} from "./restaurants";
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestaurantsService {
    restaurant: Restaurants[] = [ {RestaurantID: 1,RestaurantName:"aa",RestaurantAddress:"aa",RestaurantURL:"aa",RestaurantPhone:"aa"}];
           

selectedRestaurant: Restaurants;
    lastUpdate: Date = new Date(0);
    updateDelay: number = 5 * 60 * 1000; //5 minutes in milliseconds

    constructor(private _http: Http) { }

   loadRestaurant(): Observable<any> {
        var currentTime: Date = new Date();
        var timeSinceLastUpdate: number = currentTime.getTime() - this.lastUpdate.getTime();
        var that = this;
        if (timeSinceLastUpdate > this.updateDelay || this.restaurant === {}) {
            this.lastUpdate = new Date();
            console.log("+++++++++++++++updating restaurant list. Time since last update: " + timeSinceLastUpdate + "  Update delay: " + this.updateDelay);
            var urlString: string = "http://theanchorage.dev.bespoke.house/GoogleMap/nearbyRestaurant.json";
            return this._http.get(urlString)
                .map(response => { return that.restaurant = response as any })
                .catch(this.handleError);
        } else {
            console.log("+++++++++++++++ using old restaurant")
            return new Observable(observer => {
                observer.next(that.restaurant);
                observer.complete();
            });
        }
    }

    handleError(error: any) {
        console.log("++++++++++++++++++ failed to get restaurant");

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    //get offers that have not expired
    /*getValidOffers() {
        this.loadRestaurant();

        var validOffers: Offer[] = [];

        var currentDate: Date = new Date();

        this.offers.forEach(offer => {
            if (currentDate.getTime() < offer.ExpirationDate.getTime()) {
                validOffers.push(offer);
            }
        });

        return validOffers;
    }*/

}
import { Injectable } from '@angular/core';
import {Offer} from "./offer";
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OfferService {

    offers: Offer[];
    selectedOffer: Offer;
    lastUpdate: Date = new Date(0);
    updateDelay: number = 5 * 60 * 1000; //5 minutes in milliseconds

    constructor(private _http: Http) { }

    loadOffers(): Observable<any> {
        var currentTime: Date = new Date();
        var timeSinceLastUpdate: number = currentTime.getTime() - this.lastUpdate.getTime();
        var that = this;
        if (timeSinceLastUpdate > this.updateDelay || this.offers === {}) {
            this.lastUpdate = new Date();
            console.log("+++++++++++++++updating offers list. Time since last update: " + timeSinceLastUpdate + "  Update delay: " + this.updateDelay);
            var urlString: string = "http://bespokeapi.dev.bespoke.house/api/offer";
            return this._http.get(urlString)
                .map(response => { return that.offers = response as any })
                .catch(this.handleError);
        } else {
            console.log("+++++++++++++++ using old offers")
            return new Observable(observer => {
                observer.next(that.offers);
                observer.complete();
            });
        }
    }

    handleError(error: any) {
        console.log("++++++++++++++++++ failed to get offers");

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    //get offers that have not expired
    getValidOffers() {
        this.loadOffers();

        var validOffers: Offer[] = [];

        var currentDate: Date = new Date();

        this.offers.forEach(offer => {
            if (currentDate.getTime() < offer.ExpirationDate.getTime()) {
                validOffers.push(offer);
            }
        });

        return validOffers;
    }

}
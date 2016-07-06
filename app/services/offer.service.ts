import { Injectable } from '@angular/core';
import {Offer} from "./offer";
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Rx';
import {XmlService} from "./xml.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OfferService {

     offers: Offer[];
     selectedOffer: Offer;

    constructor(private _http: Http, private _xmlService: XmlService) { }

    loadOffers(): Observable<any> {
        var urlString: string = "http://bespokeapi.dev.bespoke.house/api/offer";
        return this._http.get(urlString)
            .map(this.extractData)
            .catch(this.handleError);
    }

    extractData(response: any) {
        this.offers = response;
        return this.offers || {};
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
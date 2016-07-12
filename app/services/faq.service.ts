import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Faq} from "./faq";
var http = require("http");


@Injectable()
export class FaqService {
    faq: Faq[] ;
   
selectedFaq: Faq;
    lastUpdate: Date = new Date(0);
    updateDelay: number = 5 * 60 * 1000; //5 minutes in milliseconds

    constructor(private _http: Http) { }

   loadFaq() {

        var currentTime: Date = new Date();
        var timeSinceLastUpdate: number = currentTime.getTime() - this.lastUpdate.getTime();
        var that = this;
        if (timeSinceLastUpdate > this.updateDelay || this.faq === {}) {
            this.lastUpdate = new Date();
            console.log("+++++++++++++++updating faq list. Time since last update: " + timeSinceLastUpdate + "  Update delay: " + this.updateDelay);
            var urlString: string = "http://bespokeapi.dev.bespoke.house/api/QualifyingQuestion";
            return this._http.get(urlString)
                .map(response => {
                    console.log("+++++++++++++++++" + JSON.stringify(response));
                     
                     return that.faq = response as any;})
                .catch(this.handleError);
        } else {
            console.log("+++++++++++++++ using old faq")
            return new Observable(observer => {
                observer.next(that.faq);
                observer.complete();
            });
        }
    }

    handleError(error: any) {
        console.log("++++++++++++++++++ failed to get faq");

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
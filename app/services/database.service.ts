import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Rx';

import {ApiInfo} from "./apiInfo";

import {Faq} from "./faq";

import {Event} from "./event";
import {Menu} from "./menu";
import {Offer} from "./offer";
import {Restaurants} from "./restaurants";


const defaultDelayTime: number = 5 * 60 * 1000; //5 minutes

@Injectable()
export class DatabaseService {

    apiInformation: ApiInfo[] = [
        new ApiInfo("Faq", "http://bespokeapi.dev.bespoke.house/api/QualifyingQuestion"),
        new ApiInfo("Calendar", "http://bespokeapi.dev.bespoke.house/api/Event"),
        new ApiInfo("Menu", "http://bespokeapi.dev.bespoke.house/api/FoodMenu"),
        new ApiInfo("Offer", "http://bespokeapi.dev.bespoke.house/api/Offer"),
        new ApiInfo("Restaurant", "http://bespokeapi.dev.bespoke.house/api/Restaurant"),
        new ApiInfo("Itinerary", "http://bespokeapi.dev.bespoke.house/api/EventItenary")
    ];

    constructor(private _http: Http) { }

    getApiData(apiName: string): Observable<any> {
        var requestedApi: ApiInfo = null;

        for (var i = 0; i < this.apiInformation.length; i++) {
            if (this.apiInformation[i].name === apiName) {
                requestedApi = this.apiInformation[i];
                break;
            }
        }

        if (requestedApi) {
            return this.getData(requestedApi);
        } else {
            console.log("Error: no api with that name is in apiInformation");
            return null;
        }
    }

    setSelectedObject(apiName: string, object: any) {
        var requestedApi: ApiInfo = null;

        for (var i = 0; i < this.apiInformation.length; i++) {
            if (this.apiInformation[i].name === apiName) {
                requestedApi = this.apiInformation[i];
                break;
            }
        }

        if (requestedApi) {
            requestedApi.selectedObject = object;
        } else {
            console.log("Error: no api with that name is in apiInformation");
            return null;
        }
    }

    getSelectedObject(apiName: string) {
        var requestedApi: ApiInfo = null;

        for (var i = 0; i < this.apiInformation.length; i++) {
            if (this.apiInformation[i].name === apiName) {
                requestedApi = this.apiInformation[i];
                break;
            }
        }

        if (requestedApi) {
            return requestedApi.selectedObject;
        } else {
            console.log("Error: no api with that name is in apiInformation");
            return null;
        }
    }

    pushObject(apiName: string, object: any) {
        var requestedApi: ApiInfo = null;

        for (var i = 0; i < this.apiInformation.length; i++) {
            if (this.apiInformation[i].name === apiName) {
                requestedApi = this.apiInformation[i];
                break;
            }
        }

        if (requestedApi) {
            var url = requestedApi.url;
            console.log("posting object: " + JSON.stringify(object));
            console.log("posting to url: " + url);
            this._http.post(url, object)
                .subscribe((response) => console.log(response),
                (error) => console.log(error));
        } else {
            console.log("Error: no api with that name is in apiInformation");
            return null;
        }
    }

    putObject(apiName: string, object: any, putId: number) {
         var requestedApi: ApiInfo = null;

        for (var i = 0; i < this.apiInformation.length; i++) {
            if (this.apiInformation[i].name === apiName) {
                requestedApi = this.apiInformation[i];
                break;
            }
        }

        if (requestedApi) {
            var url = requestedApi.url + "/" + putId;
            console.log("putting object: " + JSON.stringify(object));
            console.log("putting to url: " + url);
            this._http.put(url, object)
                .subscribe((response) => console.log(response),
                (error) => console.log(error));
        } else {
            console.log("Error: no api with that name is in apiInformation");
            return null;
        }
    }

    private getData(api: ApiInfo): Observable<any> {
        var timeSinceLastUpdate = Date.now() - api.lastUpdate.getTime();
        if (timeSinceLastUpdate > api.updateDelay || api.data === null) {
            api.lastUpdate = new Date();
            return this._http.get(api.url)
                .map(response => api.data = response);
        } else {
            return new Observable(observer => {
                observer.next(api.data);
                observer.complete();
            });
        }
    }

}
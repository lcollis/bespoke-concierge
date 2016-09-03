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
        new ApiInfo("Itinerary", "http://bespokeapi.dev.bespoke.house/api/EventItenary", null, 0),
        new ApiInfo("Tasks", "http://bespokeapi.dev.bespoke.house/api/AgentTask", null, 0),
        new ApiInfo("Users", "http://bespokeapi.dev.bespoke.house/api/User"),
        new ApiInfo("Info", "", "Veniam proident ex excepteur nisi aliquip magna. Pariatur ea id id proident enim commodo ut. Irure ut qui minim tempor incididunt excepteur ullamco do irure in culpa veniam non. Ullamco Lorem et ut id Lorem eiusmod ad nostrud irure. Ullamco quis magna adipisicing tempor quis incididunt reprehenderit sunt ut enim labore est exercitation. Pariatur mollit incididunt non ullamco tempor eu sunt sunt. Ipsum proident Lorem nulla aliqua.")
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

    getSelectedObject(apiName: string): any {
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

    postObject(apiName: string, object: any): Observable<any> {
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
            return this._http.post(url, object);
        } else {
            console.log("Error: no api with that name is in apiInformation");
            return null;
        }
    }

    putObject(apiName: string, object: any, putId: number): Observable<any> {
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
            return this._http.put(url, object);
        } else {
            console.log("Error: no api with that name is in apiInformation");
            return null;
        }
    }

    deleteObject(apiName: string, index: number): Observable<any> {
                var requestedApi: ApiInfo = null;

        for (var i = 0; i < this.apiInformation.length; i++) {
            if (this.apiInformation[i].name === apiName) {
                requestedApi = this.apiInformation[i];
                break;
            }
        }

        if (requestedApi) {
            var url = requestedApi.url + "/" + index;
            console.log("Deleting index " + index + " at url " + url);
            return this._http.delete(url);
        } else {
            console.log("Error: no api with that name is in apiInformation");
            return null;
        }
    }

    private getData(api: ApiInfo): Observable<any> {
        var timeSinceLastUpdate = Date.now() - api.lastUpdate.getTime();
        if (timeSinceLastUpdate > api.updateDelay || api.data === null) {
            api.lastUpdate = new Date();
            if (api.url !== "") {
                return this._http.get(api.url)
                    .map(response => { 
                        return api.data = response;
                    });

            } else {
                console.log("No url given for api: " + api.name)
                return new Observable(observer => {
                    observer.next(api.data);
                    observer.complete();
                });
            }
        } else {
            return new Observable(observer => {
                observer.next(api.data);
                observer.complete();
            });
        }
    }

}

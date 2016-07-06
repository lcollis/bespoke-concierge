import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WeatherService {

    apiKey: string = "17ac853c1a6c06c1c0bb49046eb1e985";
    lat: string = "32.4195";
    long: string = "-80.6903";

    weather: any;

    constructor(private _http: Http) { }

    getWeather(): Observable<any> {
        var urlString: string = "https://api.forecast.io/forecast/" + this.apiKey + "/" + this.lat + "," + this.long + "?exclude:[minutely,alerts,flags]";
        return this._http.get(urlString)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: any) {
        this.weather = res._body;
        return this.weather || {};
    }

    private handleError(error: any) {
        console.log("++++++++++++++++++ failed to get weather");

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }


}
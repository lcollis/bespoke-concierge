import { Component } from '@angular/core';
import {Router} from "@angular/router-deprecated";
import {WeatherService} from "../../services/weather.service";

@Component({
    selector: 'weather',
    templateUrl: 'pages/weather/weather.html',
    providers: [WeatherService]
})
export class WeatherComponent {

    weather: any;
    currentTemp: number;

    constructor(private _router: Router, weatherService: WeatherService) {
        weatherService.getWeather()
            .subscribe(
            weather => this.gotWeather(weather),
            error => console.error(error.status));

    }

    onNavBtnTap() {
        this._router.navigate(["Home"]);
    }

    gotWeather(response: any) {
        this.weather = response;
        this.currentTemp = Math.floor(this.weather.currently.temperature);
    }

}
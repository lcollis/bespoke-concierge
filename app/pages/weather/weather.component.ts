import { Component } from '@angular/core';
import {Router} from "@angular/router-deprecated";
import {WeatherService} from "../../services/weather.service";

@Component({
    selector: 'weather',
    templateUrl: 'pages/weather/weather.html',
    styleUrls: ['pages/weather/weather.css']
})
export class WeatherComponent {

    weather: any;
    currentTemp: number;
    currentSummary: string;
    todayHigh: number;
    todayLow: number;
    loading: boolean = true;
    icon: string;
    imageURL: string;

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
        this.currentSummary = this.weather.currently.summary;
        this.todayHigh = Math.floor(this.weather.daily.data[0].temperatureMax);
        this.todayLow = Math.floor(this.weather.daily.data[0].temperatureMin);
        this.icon = this.weather.currently.icon;
        this.loading = false;

        this.handleImage();
    }

    handleImage() {        
        switch (this.icon) {
            case "clear-day":
            case "clear-night":
            case "wind":
                this.imageURL = "sunny";
                break;

            case "cloudy":
            case "fog":
                this.imageURL = "cloudy";
                break;

            case "rain":
                this.imageURL = "drizzle";
                break;

                case "partly-cloudy-day":                
                case "partly-cloudy-night":                
                this.imageURL = "mostlycloudy";
                break;

                case "snow":
                case "sleet":
                this.imageURL = "snow";
                break;

                case "thunderstorm":
                case "hail":
                case "tornado":
                this.imageURL = "thunderstorm";
                break;

            default:
                this.imageURL = "sunny";
                break;
        }
    }

}
import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {WeatherService} from "../../services/weather.service";
import { TextService } from "../../services/text.service";

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

    constructor(private _router: Router, weatherService: WeatherService, private _textService: TextService) {
        weatherService.getWeather()
        .subscribe(
            weather => this.gotWeather(weather),
                error => this.weatherError(error));

    }

    onNavBtnTap() {
        this._router.navigate(["/GuestScreen/Home"]);
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

    weatherError(error:any) {
        console.error(error.status);
        alert(this._textService.getText().serverError);
        this._router.navigate(["/GuestScreen/Home"]);
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

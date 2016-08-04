import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Page} from "ui/page";

@Component({
    selector: 'home',
    templateUrl: 'pages/home/home.html',
    styleUrls: ['pages/home/home.css']
})
export class HomeComponent {
    constructor(private _router: Router, page: Page) {
        page.actionBarHidden = true;
    }

    chat() {
        this._router.navigate(["/Chat"]);
    }

    faq() {
        this._router.navigate(["/Faq"]);
    }

    requests() {
        this._router.navigate(["/MakeRequests"]);
    }

    info() {
        this._router.navigate(["/HotelInfo"]);
    }

    forgot() {
        this._router.navigate(["/ForgotSomething"]);
    }
    
    restaurants() {
        this._router.navigate(["/Restaurants"]);
    }

    calendar() {
        this._router.navigate(["/Calendar"]);
    }

    tripAdvisor() {
        this._router.navigate(["/TripAdvisor"]);
    }
}
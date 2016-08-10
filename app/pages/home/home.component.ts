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
        this._router.navigate(["/GuestScreen/Chat"]);
    }

    faq() {
        this._router.navigate(["/GuestScreen/Faq"]);
    }

    requests() {
        this._router.navigate(["/GuestScreen/MakeRequests"]);
    }

    info() {
        this._router.navigate(["/GuestScreen/HotelInfo"]);
    }

    forgot() {
        this._router.navigate(["/GuestScreen/ForgotSomething"]);
    }
    
    restaurants() {
        this._router.navigate(["/GuestScreen/Restaurants"]);
    }

    tidyUp() {
        this._router.navigate(["/GuestScreen/TidyUp"]);
    }

    maintenance() {
        this._router.navigate(["/GuestScreen/Maintenance"]);
    }

    calendar() {
        this._router.navigate(["/GuestScreen/Calendar"]);
    }

    tripAdvisor() {
        this._router.navigate(["/GuestScreen/TripAdvisor"]);
    }
}
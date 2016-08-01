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
        console.log("chat");
        this._router.navigate(["/Chat"]);
    }

    info() {
        this._router.navigate(["/HotelInfo"]);
    }

    tripAdvisor() {
        this._router.navigate(["/TripAdvisor"]);
    }
}
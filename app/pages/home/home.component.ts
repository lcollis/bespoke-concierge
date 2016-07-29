import { Component, OnInit } from '@angular/core';
import { NS_ROUTER_DIRECTIVES } from "nativescript-angular/router";
import {Router} from "@angular/router";
import {Page} from "ui/page";

@Component({
    selector: 'home',
    templateUrl: 'pages/home/home.html',
    styleUrls: ['pages/home/home.css'],
    directives: [NS_ROUTER_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    constructor(private _router: Router, page: Page) {
        page.actionBarHidden = true;
    }

    ngOnInit() { }

    tap() {
        console.log("tap");
    }

    message() {
        this._router.navigate(["/TripAdvisor"]);
    }

    question() {
        this._router.navigate(["/TripAdvisor"]);
    }

    request() {
        this._router.navigate(["/TripAdvisor"]);
    }

    info() {
        this._router.navigate(["/HotelInfo"]);
    }

    forgot() {
        this._router.navigate(["/TripAdvisor"]);
    }

    restaurants() {
        this._router.navigate(["/TripAdvisor"]);
    }

    tidy() {
        this._router.navigate(["/TripAdvisor"]);
    }

    calendar() {
        this._router.navigate(["/TripAdvisor"]);
    }

    maintenance() {
        this._router.navigate(["/TripAdvisor"]);
    }

    tripAdvisor() {
        this._router.navigate(["/TripAdvisor"]);
    }
}
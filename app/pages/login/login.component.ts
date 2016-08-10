import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: 'login',
    templateUrl: 'pages/login/login.html'
})
export class LoginComponent {
    constructor(private _routerExtensions: RouterExtensions) { }

    staff() {
        //clear history so that user cant swipe back to login screen
        this._routerExtensions.navigate(["/StaffScreen"], { clearHistory: true});
    }

    guest() {
        //clear history so that user cant swipe back to login screen
        this._routerExtensions.navigate(["/GuestScreen"], { clearHistory: true});
    }

    owner() {
        console.log("owner");
    }
}
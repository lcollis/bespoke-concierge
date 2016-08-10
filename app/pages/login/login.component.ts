import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: 'pages/login/login.html'
})
export class LoginComponent {
    constructor(private _router: Router) { }

    staff() {
        this._router.navigate(["/StaffScreen"]);
    }

    guest() {
        this._router.navigate(["/GuestScreen"]);
    }

    owner() {
        console.log("owner");
    }
}
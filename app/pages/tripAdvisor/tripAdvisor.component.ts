import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router-deprecated";

@Component({
    selector: 'tripAdvisor',
    templateUrl: '/pages/tripAdvisor/tripAdvisor.html'
})
export class TripAdvisorComponent implements OnInit {
    constructor(private _router:Router) { }

    ngOnInit() { }

    onNavBtnTap() {
        this._router.navigate(["Home"]);
    }
}
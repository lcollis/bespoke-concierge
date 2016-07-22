import { Component, OnInit } from '@angular/core';
import {  Router } from "@angular/router";
import { HotelInformationService } from "../../services/hotelInformation.service";

@Component({
    selector: 'hotelInfo',
    templateUrl: 'pages/hotelInfo/hotelInfo.html',
    styleUrls: ['pages/hotelInfo/hotelInfo.css'],
    providers: [HotelInformationService]
})
export class HotelInfoComponent implements OnInit {

    hotelInfo: string;

    constructor(private _router: Router, hotelInfoService: HotelInformationService) {
        this.hotelInfo = hotelInfoService.getHotelInformation();
    }

    ngOnInit() {

    }

    onNavBtnTap() {
        this._router.navigate(["/Home"]);
    }
}
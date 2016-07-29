import { Component } from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {Page} from "ui/page";

@Component({
    selector: 'hotelInfo',
    templateUrl: 'pages/hotelInfo/hotelInfo.html',
    styleUrls: ['pages/hotelInfo/hotelInfo.css']
})
export class HotelInfoComponent {

    hotelInfo: string;

    constructor(page: Page, _databaseService: DatabaseService) {
        _databaseService.getApiData("Info").subscribe(
            (data) => this.hotelInfo = data,
            (error) => console.log(error)
        );

        page.actionBarHidden = true;
    }
}
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
            (data) => { 
                var hotelData = data._body;
                console.log("Got hotel data: " + JSON.stringify(hotelData));
                var hotelInfo = hotelData.filter((d) => { 
                    console.log("d: " + JSON.stringify(d));
                    return d.SettingName === "hotelInfo"
                })[0];
                console.log("hotel info: " + JSON.stringify(hotelInfo));
                this.hotelInfo = hotelInfo.SettingValue;
            },
            (error) => console.log(error)
        );

        page.actionBarHidden = true;
    }
}

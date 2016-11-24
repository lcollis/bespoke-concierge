import { Component } from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import { TextService } from "../../services/text.service";
import {Page} from "ui/page";

@Component({
    selector: 'hotelInfo',
    templateUrl: 'pages/hotelInfo/hotelInfo.html',
    styleUrls: ['pages/hotelInfo/hotelInfo.css']
})
export class HotelInfoComponent {

    hotelInfo: string;

    constructor(page: Page, _databaseService: DatabaseService, private _textService: TextService) {
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
            (error) => {
                console.log(error)
                alert(this._textService.getText().serverError);
            }
        );

        page.actionBarHidden = true;
    }
}

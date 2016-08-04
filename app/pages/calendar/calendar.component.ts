import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
var dialogs = require("ui/dialogs");
import {Event,ItineraryEvent} from "../../services/event";
import {DatabaseService} from "../../services/database.service";
import {UserIdService} from "../../services/userId.service";

@Component({
    selector: 'calendar',
    templateUrl: 'pages/calendar/calendar.html',
    styleUrls: ['pages/calendar/calendar.css']
})
export class CalendarComponent {

    events: Event[];
    loading:boolean = true;

    constructor(private _router: Router, private _userIdService: UserIdService, private _databaseService: DatabaseService) {
        _databaseService.getApiData("Calendar").subscribe(
            events => this.gotEvents(events),
            error => this.receivingError(error));
    }

    gotEvents(events: any) {
        this.loading = false;
        this.events = events._body;
    }

    receivingError(error) {
        console.error(error.status);
        alert("No Internet Connection");
        this._router.navigate(["/Home"]);
    }

    addToItinerary(event: Event) {
        var itineraryEvent: ItineraryEvent = new ItineraryEvent(event, 1234);
        this._databaseService.postObject("Itinerary", itineraryEvent)
            .subscribe(() => {
                dialogs.alert({
                        title: "Reserve",
                        message: "Successfully reserved! You can find your reserved events in the Itinerary",
                        okButtonText: "OK"
                    });
                    this._router.navigate(["/Home"]);
            }, (error) => {
                alert("Could not connect to the server. Please try again later.");
            });
    }
}
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { UserIdService } from "../../services/userId.service";
import { Event, ItineraryEvent } from "../../services/event";

@Component({
    selector: 'itinerary',
    templateUrl: 'pages/itinerary/itinerary.html',
    styleUrls: ['pages/itinerary/itinerary.css']
})
export class ItineraryComponent {

    events: Event[] = new Array();
    private itineraryEvents: ItineraryEvent[];

    loading: boolean = true;

    constructor(private _dbService: DatabaseService, private _userIdService: UserIdService) {
        var that = this;
        //get userID
        this._userIdService.getUserId().then((userID: string) => {
            //get itinerary events
            that._dbService.getApiData("Itinerary")
                .subscribe((data) => {
                    //remove events for other guests
                    that.itineraryEvents = data._body.filter((e: ItineraryEvent) => {
                        return e.PersonID === parseInt(userID);
                    });
                     //get Events from server 
                    that._dbService.getApiData("Calendar")
                        .subscribe((data) => {
                            //take only events from the itinerary 
                            that.events = that.getEvents(that.itineraryEvents, data._body);
                            that.loading = false;
                        }, (error: any) => {
                            console.log(error);
                        });
                }, (error: any) => {
                    console.log(error);
                })
        });

    }

    getEvents(itineraryEvents: ItineraryEvent[], events: Event[]): Event[] {
        var output: Event[] = new Array();

        for(var i = 0; i < itineraryEvents.length; i++) {
            var itineraryEvent = itineraryEvents[i];
            var eventID = itineraryEvent.EventID;
            var subEventID = itineraryEvent.SubEventID;

            var realEvent;
            for(var n = 0; n < events.length; n++) {
                var event = events[n];
                var id = event.EventID;
                var subId = event.SubEventID;

                if(eventID === id && subEventID === subId) {
                    realEvent = event;
                }
            }

            if(realEvent) {
                console.log("event: " + JSON.stringify(realEvent));
                output.push(realEvent);
            } else {
                console.log("!!!!Event not found for itinerary event: " + JSON.stringify(itineraryEvent));
            }
        }
        console.log("Output: " + JSON.stringify(output));
        return output;
    }

    test() {
        console.log("test. events: " + JSON.stringify(this.events));
    }

}
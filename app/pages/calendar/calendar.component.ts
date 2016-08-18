import { Component, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
var dialogs = require("ui/dialogs");
import {Event, ItineraryEvent} from "../../services/event";
import {DatabaseService} from "../../services/database.service";
import {UserIdService} from "../../services/userId.service";

@Component({
    selector: 'calendar',
    templateUrl: 'pages/calendar/calendar.html',
    styleUrls: ['pages/calendar/calendar.css']
})
export class CalendarComponent {

    @ViewChild("listview") listView;

    events: Event[];
    private itineraryEvents: ItineraryEvent[] = new Array();;
    loading: boolean = true;
    private receivedItineraryEvents = false;
    private receivedEvents = false;

    constructor(private _router: Router, private _userIdService: UserIdService, private _databaseService: DatabaseService) {
        _databaseService.getApiData("Calendar").subscribe(
            events => this.gotEvents(events),
            error => this.receivingError(error));


        //get itinerary events for the user to see what they already have resesrved
        this._userIdService.getUserId().then((userID: string) => {
            _databaseService.getApiData("Itinerary").subscribe(
                (response) => {
                    //remove events for other guests
                    this.itineraryEvents = response._body.filter((e: ItineraryEvent) => {
                        return e.PersonID === parseInt(userID);
                    });

                    this.receivedItineraryEvents = true;
                    if (this.receivedEvents) {
                        this.loading = false;
                    }
                });
        });
    }

    gotEvents(events: any) {
        this.events = events._body;
        this.receivedEvents = true;
        if (this.receivedItineraryEvents) {
            this.loading = false;
        }
    }

    receivingError(error) {
        console.error(error.status);
        alert("No Internet Connection");
        this._router.navigate(["/GuestScreen/Home"]);
    }

    addToItinerary(event: Event) {
        this._userIdService.getUserId().then((userID: string) => {
            var itineraryEvent: ItineraryEvent = new ItineraryEvent(event, parseInt(userID));
            this._databaseService.postObject("Itinerary", itineraryEvent)
                .subscribe((response) => {
                    dialogs.alert({
                        title: "Reserve",
                        message: "Successfully reserved! You can find your reserved events in the Itinerary",
                        okButtonText: "OK"
                    });
                    
                    var madeEvent = response._body;
                    this.itineraryEvents.push(madeEvent);
                    this.listView._elementRef.nativeElement.refresh();
                }, (error) => {
                    alert("Could not connect to the server. Please try again later.");
                });
        });
    }

    removeFromItinerary(event: Event) {
        var eventID = event.EventID;
        var subEventID = event.SubEventID;

        //remove from the server
        var itinEventsToRemove = this.itineraryEvents.filter((e) => {
            return (e.EventID === eventID && e.SubEventID === subEventID);
        });

        itinEventsToRemove.forEach((e) => {
            console.log('trying to delete: ' + JSON.stringify(e));
            this._databaseService.deleteObject("Itinerary", e.EventItenaryID)
                .subscribe((response: Response) => {
                    console.log('Response: ' + response.status);
                }, (error: any) => {
                    console.log(error);
                });
        });

        //remove from the local itinerary events array
        this.itineraryEvents = this.itineraryEvents.filter((e) => {
            return !(e.EventID === eventID && e.SubEventID === subEventID);
        });
    }

    isReserved(event: Event): boolean {
        if (this.itineraryEvents) {
            var eventID = event.EventID;
            var subEventID = event.SubEventID;

            var foundMatch = false;

            this.itineraryEvents.forEach((e) => {
                if (e.EventID === eventID && e.SubEventID === subEventID) {
                    foundMatch = true;
                }
            });
        }
        return foundMatch;
    }
}

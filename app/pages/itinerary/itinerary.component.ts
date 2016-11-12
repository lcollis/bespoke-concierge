import { Component, OnInit, NgZone } from '@angular/core';
import { ToLocalTimePipe } from "../../pipes/toLocalTime.pipe";
import { DatabaseService } from "../../services/database.service";
import { UserIdService } from "../../services/userId.service";
import { Event, ItineraryEvent } from "../../services/event";
import { Task } from "../../services/taskServices/task";
import { MomentPipe } from "../../pipes/moment.pipe";

@Component({
    selector: 'itinerary',
    templateUrl: 'pages/itinerary/itinerary.html',
    styleUrls: ['pages/itinerary/itinerary.css']
})
export class ItineraryComponent {

    events: Event[] = new Array();
    private itineraryEvents: ItineraryEvent[]

    loading: boolean = true;
    noEvents: boolean = false;
    private gotReservations: boolean = false;
    private gotItinerary: boolean = false;

    constructor(private _dbService: DatabaseService, private _userIdService: UserIdService, private _ngZone: NgZone) {
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
                            that.events = that.events.concat(that.getEvents(that.itineraryEvents, data._body));
                            that.gotItinerary = true;
                            if (that.gotReservations === true) {
                                that.sortEvents();
                                that.loading = false;
                                if(that.events.length === 0) {
                                    console.log("No Events!");
                                    that.noEvents = true;
                                }
                            }
                        }, (error: any) => {
                            console.log("Error getting calendar events");
                            console.log(error);
                            that.loading = false;
                            that.noEvents = that.events.length === 0;
                        });
                }, (error: any) => {
                    console.log("Error getting itinerary events");
                    console.log(error);
                    that.loading = false;
                    that.noEvents = true;
                });

            //get restaurant reservations and add these to itinerary too
            that._dbService.getApiData("Tasks")
                .subscribe((data) => {
                    var tasks: Task[] = data._body;
                    //find tasks with title: 'Dinner Reservation'
                    var dinnerReservations: Task[] = tasks.filter((t: Task) => {
                        return t.ShortDescription === 'Dinner Reservation';
                    });
                    if (dinnerReservations.length > 0) {
                        //convert the tasks to events and add them to the list
                        dinnerReservations.forEach((res: Task) => {
                            var toLocalTimePipe = new ToLocalTimePipe();

                            var startDate: Date = toLocalTimePipe.transform(res.ScheduledTimestamp.toString());
                            var endDate: Date = new Date(startDate.getTime() + 90 * 60 * 1000); //end date 90 minutes after start date

                            var resEvent: Event = new Event(res.ShortDescription, res.Description, startDate, endDate);
                            that.events.push(resEvent);
                        });
                        that.gotReservations = true;
                    } else {
                        //no dinner reservations
                        that.gotReservations = true;
                    }
                    if (that.gotItinerary === true) {
                        that.sortEvents();
                        that.loading = false;
                        if(that.events.length === 0) {
                            console.log("No Events!");
                            that.noEvents = true;
                        }
                    }

                }, (error) => {
                    console.log(error);
                })
        });
    }

    remove(event: Event) {
        console.log("removing event: " + JSON.stringify(event));
        console.log('Events' + JSON.stringify(this.events));

        //remove the event from the events list
        this.events = this.events.filter((e) => {
            return e !== event;
        });

        //get all the itinerary events for the event
        var eventID = event.EventID;
        var subEventID = event.SubEventID;
        var itinEventsToRemove = this.itineraryEvents.filter((e) => {
            return e.EventID === eventID && e.SubEventID === subEventID;
        });
        //remove itinerary events from array
        this.itineraryEvents = this.itineraryEvents.filter((e) => {
            return !(e.EventID === eventID && e.SubEventID === subEventID);
        });

        //remove itinerary events from server
        itinEventsToRemove.forEach((e) => {
            this._dbService.deleteObject("Itinerary", e.EventItenaryID)
                .subscribe((response: Response) => {
                    console.log("Status: " + response.status + " " + response.statusText);
                }, (error: any) => {
                    console.log(error);
                });;
        });
    }

    private getEvents(itinEvent: ItineraryEvent[], events: Event[]): Event[] {
        var output: Event[] = new Array();

        for (var i = 0; i < itinEvent.length; i++) {
            var itineraryEvent = itinEvent[i];
            var eventID = itineraryEvent.EventID;
            var subEventID = itineraryEvent.SubEventID;

            var realEvent;
            for (var n = 0; n < events.length; n++) {
                var event = events[n];
                var id = event.EventID;
                var subId = event.SubEventID;

                if (eventID === id && subEventID === subId) {
                    realEvent = event;
                }
            }

            if (realEvent) {
                output.push(realEvent);
            } else {
                console.log("!!!!Event not found for itinerary event: " + JSON.stringify(itineraryEvent));
            }
        }
        return output;
    }

    private sortEvents() {

        var now = new Date();

        //remove events that have already happened 
        this.events = this.events.filter((event: Event) => {
            var startTime = new Date(event.StartTime);
            return now.getTime() < startTime.getTime();
        });

        //sort events by start time
        this.events = this.events.sort(function (c, d) {
            var a = new Date(c.StartTime);
            var b = new Date(d.StartTime);
            return a > b ? 1 : a < b ? -1 : 0;
        });

        //remove duplicates
        this.events = this.events.filter((value, index, array) => {
            if (index > 0) {
                if (value === array[index - 1]) {
                    return false;
                }
            }
            return true;
        });

        this.events.forEach((event) => {
            console.log("Event: " + event.Subject);
            console.log("start Date: " + event.StartTime);
            console.log("end Date: " + event.EndTime);
        })
    }

}

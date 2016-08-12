import { Component, OnInit } from '@angular/core';
import { ToLocalTimePipe } from "../../pipes/toLocalTime.pipe";
import { DatabaseService } from "../../services/database.service";
import { UserIdService } from "../../services/userId.service";
import { Event, ItineraryEvent } from "../../services/event";
import { Task } from "../../services/taskServices/task";

@Component({
    selector: 'itinerary',
    templateUrl: 'pages/itinerary/itinerary.html',
    styleUrls: ['pages/itinerary/itinerary.css']
})
export class ItineraryComponent {

    events: Event[] = new Array();
    private itineraryEvents: ItineraryEvent[];

    loading: boolean = true;
    private gotReservations: boolean = false;
    private gotItinerary: boolean = false;

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
                            that.events = that.events.concat(that.getEvents(that.itineraryEvents, data._body));
                            that.gotItinerary = true;
                            if (that.gotReservations === true) {
                                console.log("a");
                                that.sortEvents();
                                console.log("b");
                                that.loading = false;
                                console.log("c");
                            }
                        }, (error: any) => {
                            console.log(error);
                        });
                }, (error: any) => {
                    console.log(error);
                })

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
                            var resEvent: Event = new Event(res.ShortDescription, res.Description, res.ScheduledTimestamp);
                            that.events.push(resEvent);
                            that.gotReservations = true;
                        });
                    } else {
                        //no dinner reservations
                        that.gotReservations = true;
                    }
                    if (that.gotItinerary === true) {
                        that.sortEvents();
                        that.loading = false;
                    }

                }, (error) => {
                    console.log(error);
                })
        });

    }

    getEvents(itineraryEvents: ItineraryEvent[], events: Event[]): Event[] {
        var output: Event[] = new Array();

        for (var i = 0; i < itineraryEvents.length; i++) {
            var itineraryEvent = itineraryEvents[i];
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
        var toLocalTimePipe = new ToLocalTimePipe();

        //first format all the dates to be local time
        this.events = this.events.map((event) => {
            event.StartTime = toLocalTimePipe.transform(event.StartTime).toString();
            return event;
        });

        //remove events that have already happened 
        this.events = this.events.filter((event: Event) => {
            var eventStartTime = toLocalTimePipe.transform(event.StartTime);
            return now.getTime() < eventStartTime.getTime();
        });

        //sort events by start time
        this.events = this.events.sort(function (c, d) {
            var a = new Date(c.StartTime);
            var b = new Date(d.StartTime);
            return a > b ? 1 : a < b ? -1 : 0;
        });

        //remove duplicates
        this.events = this.events.filter((value, index, array) => {
            if(index > 0) {
                if(value === array[index - 1]) {
                    return false;
                }
            }
            return true;
        })
    }

}

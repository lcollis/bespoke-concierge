import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Event} from "../../services/event";
import {EventService} from "../../services/event.service";

@Component({
    selector: 'calendar',
    templateUrl: 'pages/calendar/calendar.html',
    providers: [EventService]
})
export class CalendarComponent {

    events: Event[];

    constructor(private _router:Router, eventService: EventService) {
        this.events = eventService.getEvents();
     }

    onNavBtnTap() {
        this._router.navigate(['Home']);
    }

    onItemTap(args) {
        var eventIndex: number = args.index;
        
    }
}
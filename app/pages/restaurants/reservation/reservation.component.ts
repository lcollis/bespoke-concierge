import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
var dialogs = require("ui/dialogs");
import * as moment from 'moment';
import { DatabaseService } from "../../../services/database.service";
import { TaskService } from "../../../services/taskServices/task.service";
import { UserIdService } from "../../../services/userId.service";
import { Restaurants } from "../../../services/restaurants";
import { Task } from "../../../services/taskServices/task";
import { ItineraryEvent } from "../../../services/event";


@Component({
    selector: 'reservation',
    templateUrl: 'pages/restaurants/reservation/reservation.html',
    styleUrls: ['pages/restaurants/reservation/reservation.css']
})
export class ReservationComponent {

    restaurant: Restaurants;

    date: Date = new Date();
    time: Date = new Date();
    party: string;
    specialOccasion: string;
    details: string;

    constructor(private _router: Router, private _databaseService: DatabaseService, private _taskService: TaskService, private _userIdService: UserIdService) {
        this.restaurant = this._databaseService.getSelectedObject("Restaurant");
    }

    cancel() {
        this._router.navigate(["/Restaurants"]);
    }

    reserve() {
        this._userIdService.getUserId().then((userID: string) => {
            var dateString: string = moment(this.date).format('MMMM Do YYYY, ') + moment(this.time).format("hh:mm a");
            var description: string = "Make reservation for " + userID + " at " + this.restaurant.RestaurantName + " on " + dateString + ".\nSpecial Occasion: " + this.specialOccasion + "\nDetails: " + this.details + "\nParty Size: " + this.party; 
            //DONT CHANGE THE SHORT DESCRIPTION it is used by the itinerary to pull in dinner reservations
            var shortDescription: string = "Dinner Reservation";
            var priority: string = "normal";
	        var scheduledTime: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 
               this.time.getHours(), this.time.getMinutes(), this.time.getSeconds());

            var task: Task = new Task(
                description,
                shortDescription,
                scheduledTime,
                priority,
                parseInt(userID)
            );

            //send reservation task
            this._taskService.sendTask(task)
                .subscribe(() => {
                    dialogs.alert({
                        title: "Complete",
                        message: "We are making your reservation! Expect a message from us in a few minutes with details, and feel free to message us first with any changes!",
                        okButtonText: "OK"
                    });
                    this._router.navigate(["/Home"]);
                }, (error: any) => {
                    console.log(error);
                    alert("No connection to the internet. Reservation information not sent.");
                });
        });
    }
}

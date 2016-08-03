import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
var dialogs = require("ui/dialogs");
import { DatabaseService } from "../../../services/database.service";
import { TaskService } from "../../../services/taskServices/task.service";
import { Restaurants } from "../../../services/restaurants";
import { Task } from "../../../services/taskServices/task";


@Component({
    selector: 'reservation',
    templateUrl: 'pages/restaurants/reservation/reservation.html',
    styleUrls: ['pages/restaurants/reservation/reservation.css']
})
export class ReservationComponent {

    restaurant: Restaurants;

    date: Date = new Date();

    party: string;

    constructor(private _router:Router, private _databaseService: DatabaseService, private _taskService: TaskService) {
        this.restaurant = this._databaseService.getSelectedObject("Restaurant");
     }
     
    cancel() {
        this._router.navigate(["/Restaurants"]);
    }

    reserve() {
        // var task: Task = new Task("")
        // this._taskService.sendTask(task);

        dialogs.alert({
            title: "Complete",
            message: "We are making your reservation! Expect a message from us in a few minutes with details, and feel free to message us first with any changes!",
            okButtonText: "OK"
        });
        this._router.navigate(["/Home"]);
    }
}
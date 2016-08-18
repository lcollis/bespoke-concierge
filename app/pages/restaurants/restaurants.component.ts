import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";
import { TaskService } from "../../services/taskServices/task.service";
import { UserIdService } from "../../services/userId.service";
import {Restaurants} from "../../services/restaurants";
import { Task } from "../../services/taskServices/task";

@Component({
    selector: 'restaurants',
    templateUrl: 'pages/restaurants/restaurants.html',
    styleUrls: ['pages/restaurants/restaurants.css']
})

export class RestaurantsComponent {
    restaurants: Restaurants[];
    loading: boolean = true;
    private gotRestaurants = false;
    private gotRequests = false;

    madeRequests: Task[];

    constructor(private _router: Router, private _databaseService: DatabaseService, private _taskService: TaskService, private _userIdService: UserIdService) {
        _databaseService.getApiData("Restaurant").subscribe(
            restaurant => this.getRestaurant(restaurant),
            error => this.receivingError(error));

        _userIdService.getUserId().then((userID) => {
            _taskService.getTasks(parseInt(userID)).subscribe(
                (tasks: Task[]) => {
                    this.madeRequests = tasks.filter((task) => {
                        return task.ShortDescription === 'Dinner Reservation';
                    });

                    this.gotRequests = true;
                    if (this.gotRestaurants) {
                        this.loading = false;
                    }
                }, (error) => {
                    console.log(error);
                }
            );
        });
    }


    getRestaurant(restaurant) {
        this.restaurants = restaurant._body;
        this.restaurants.push(null);

        this.gotRestaurants = true;
        if (this.gotRequests) {
            this.loading = false;
        }
    }

    receivingError(error) {
        console.error(error.status);
        alert("No Internet Connection");
        this._router.navigate(["/GuestScreen/Home"]);
    }

    reserve(restaurant: Restaurants) {
        this._databaseService.setSelectedObject("Restaurant", restaurant);
        this._router.navigate(["/GuestScreen/Reservation"]);
    }
}

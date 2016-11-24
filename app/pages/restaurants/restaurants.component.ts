import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";
import { TaskService } from "../../services/taskServices/task.service";
import { UserIdService } from "../../services/userId.service";
import {Restaurants} from "../../services/restaurants";
import { Task } from "../../services/taskServices/task";
import { TextService } from "../../services/text.service";

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

    constructor(private _router: Router, private _databaseService: DatabaseService, private _taskService: TaskService, private _userIdService: UserIdService, private _textService: TextService) {
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
        this.restaurants = new Array();
        this.restaurants = this.restaurants.concat(restaurant._body); //do it like this because a direct assignment adds the null to the cached array of restaurants in the DatabaseService
        this.restaurants.push(null);

        this.gotRestaurants = true;
        if (this.gotRequests) {
            this.loading = false;
        }
    }

    receivingError(error) {
        console.error(error.status);
        alert(this._textService.getText().serverError);
        this._router.navigate(["/GuestScreen/Home"]);
    }

    reserve(restaurant: Restaurants) {
        this._databaseService.setSelectedObject("Restaurant", restaurant);
        this._router.navigate(["/GuestScreen/Reservation"]);
    }
}

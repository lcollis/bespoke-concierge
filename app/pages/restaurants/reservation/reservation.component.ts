import { Component, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import {ModalDialogService, ModalDialogOptions, ModalDialogHost} from "nativescript-angular/modal-dialog";
var dialogs = require("ui/dialogs");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
import * as moment from 'moment';
import { DatabaseService } from "../../../services/database.service";
import { TaskService } from "../../../services/taskServices/task.service";
import { UserIdService } from "../../../services/userId.service";
import { Restaurants } from "../../../services/restaurants";
import { Task } from "../../../services/taskServices/task";
import { ItineraryEvent } from "../../../services/event";
import { PickerModal } from "../../modals/pickerModal.component";
import { MomentPipe } from "../../../pipes/moment.pipe";
import { TextService } from "../../../services/text.service";


@Component({
    selector: 'reservation',
    templateUrl: 'pages/restaurants/reservation/reservation.html',
    styleUrls: ['pages/restaurants/reservation/reservation.css'],
    providers: [ModalDialogService],
})
export class ReservationComponent {

    @ViewChild("specialoccasion") specialOccasionTextField;
    @ViewChild("detail") detailsTextField;

    restaurant: Restaurants;

    date: Date = new Date();
    time: Date = new Date();
    party: string;
    specialOccasion: string;
    details: string;

    constructor(private _router: Router, private _databaseService: DatabaseService, private _taskService: TaskService, private _userIdService: UserIdService, private modal: ModalDialogService, private vcRef: ViewContainerRef, private _textService: TextService) {
        this.restaurant = this._databaseService.getSelectedObject("Restaurant");
    }

    openDateModal(hasDate: boolean) {
        var options: ModalDialogOptions = {
            context: { hasDate: hasDate, date: hasDate? this.date : this.time },
            fullscreen: false,
            viewContainerRef: this.vcRef,
        };

        this.modal.showModal(PickerModal, options).then((res: Date) => {
            if(hasDate) {
                this.date = res;
            } else {
                this.time = res;
            }
        });
    }

    cancel() {
        this._router.navigate(["/GuestScreen/Restaurants"]);
    }

    reserve() {
        //start the loading animation
        var loader = new LoadingIndicator();
        loader.show();

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
                    //stop loading animation
                    loader.hide();

                    var hours = new Date().getHours();
                    //after 9pm and before 6am send "nobodys here" message instead
                    if (hours >= 21 || hours < 6) {
                        dialogs.alert({
                            title: "Complete",
                            message: this._textService.getText().afterHoursRequestConfirmation,
                            okButtonText: "OK"
                        });
                    } else {
                        dialogs.alert({
                            title: "Complete",
                            message: this._textService.getText().requestConfirmation,
                            okButtonText: "OK"
                        });
                    }
                    this._router.navigate(["/GuestScreen/Home"]);
                }, (error: any) => {
                    //stop loading animation
                    loader.hide();

                    console.log(error);
                    alert(this._textService.getText().serverError);
                });
        });
    }

    focusSpecialOccasion() {
        this.specialOccasionTextField.nativeElement.focus();
    }

    focusDetails() {
        this.detailsTextField.nativeElement.focus();
    }
}

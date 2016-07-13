import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Task} from "../../services/taskServices/task";
import {HorizonTaskService} from "../../services/taskServices/horizonTask.service";
import {FromNowPipe} from "../../pipes/fromnow.pipe";

@Component({
    selector: 'requests',
    templateUrl: 'pages/requests/requests.html',
    providers: [HorizonTaskService],
    pipes: [FromNowPipe]
})
export class RequestsComponent {
    myTasks: Task[];
    newDescription: string;
    userID: string;

    constructor(private _router: Router, private hzTaskService: HorizonTaskService) {
        //get the user ID
        hzTaskService.getUserID()
            .then((value: string) => {
                this.userID = value;
                this.getUserTasks();
            }, (error: any) => console.log(error));

    }

    getUserTasks() {
        var that = this;
        this.hzTaskService.getUsersTasks(this.userID).subscribe((taskData) => {
            if (taskData) {
                that.myTasks = taskData;
                that.myTasks = that.myTasks.sort(function (a, b) { return a.timeOfRequest.getTime() - b.timeOfRequest.getTime() });
            }
        }, (error: any) => {
            console.log(error);
        })
    }

    addTask(description: string) {
        this.newDescription = "";
        var task: Task = new Task(this.userID, new Date(), description);
        this.hzTaskService.addTask(task);
    }

    onNavBtnTap() {
        this._router.navigate(['Home']);
    }
}
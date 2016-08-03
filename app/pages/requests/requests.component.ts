import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserIdService } from "../../services/userId.service";
import { TaskService } from "../../services/taskServices/task.service";
import {Task} from "../../services/taskServices/task";
import {FromNowPipe} from "../../pipes/fromnow.pipe";

@Component({
    selector: 'requests',
    templateUrl: 'pages/requests/requests.html',
    styleUrls: ["pages/requests/requests.css"],
    pipes: [FromNowPipe]
})
export class RequestsComponent {

    loading: boolean = true;
    noTasks: boolean = false;

    tasks: Task[];

    constructor(private _router: Router, private _taskService: TaskService, private _userIdService: UserIdService) {
        _userIdService.getUserId().then((userID: string) => {
            _taskService.getTasks(parseInt(userID))
                .subscribe((tasks) => {
                    this.tasks = tasks;
                    this.loading = false;
                }, (error: any) => {
                    console.log(error);
                    alert("No internet access. Could not get requests");
                    _router.navigate(["/Home"]);
                }, () => {
                    this.loading = false;

                    if (!this.tasks) {
                        this.noTasks = true;
                        console.log("no tasks");
                    }
                });
        })
    }
}
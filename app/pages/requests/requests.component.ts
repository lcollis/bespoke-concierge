import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserIdService } from "../../services/userId.service";
import { TaskService } from "../../services/taskServices/task.service";
import {Task} from "../../services/taskServices/task";
import {FromNowPipe} from "../../pipes/fromnow.pipe";
import { ToLocalTimePipe } from "../../pipes/toLocalTime.pipe";

@Component({
    selector: 'requests',
    templateUrl: 'pages/requests/requests.html',
    styleUrls: ["pages/requests/requests.css"],
    pipes: [FromNowPipe, ToLocalTimePipe]
})
export class RequestsComponent {

    loading: boolean = true;
    noTasks: boolean = false;

    tasks: Task[];

    constructor(private _router: Router, private _taskService: TaskService, private _userIdService: UserIdService) {
        _userIdService.getUserId().then((userID: string) => {
            _taskService.getTasks(parseInt(userID))
                .subscribe((tasks) => {
                    this.tasks = this.sortTasks(tasks);
                    this.addSeparators();
                    this.loading = false;
                }, (error: any) => {
                    console.log(error);
                    alert("No internet access. Could not get requests");
                    _router.navigate(["/GuestScreen/Home"]);
                }, () => {
                    this.loading = false;

                    if (!this.tasks) {
                        this.noTasks = true;
                        console.log("no tasks");
                    }
                });
        })
    }

    sortTasks(tasks: Task[]): Task[] {
        //split tasks into completed and not completed
        var completed = tasks.filter((task) => { return task.Completed });
        var notCompleted = tasks.filter((task) => { return !task.Completed });

        //sort each by time requested        
        completed = completed.sort(function (c, d) {
            var a = c.CreatedTimestamp;
            var b = d.CreatedTimestamp;
            return a > b ? -1 : a < b ? 1 : 0;
        });

        notCompleted = notCompleted.sort(function (c, d) {
            var a = c.CreatedTimestamp;
            var b = d.CreatedTimestamp;
            return a > b ? -1 : a < b ? 1 : 0;
        });

        //join back together
        return notCompleted.concat(completed);
    }

    addSeparators() {
        //add in progress separator
        if (this.tasks[0].Completed === false) {
            //task with all null entries is treated as the in progress separator
            this.tasks.unshift(new Task(null, null, null, null, null));
        }

        //add completed separator
        var index;
        for (var i = 0; i < this.tasks.length; i++) {
            var task: Task = this.tasks[i];
            if (task.Completed) {
                index = i;
                break;
            }
        }

        if (index) {
            this.tasks.splice(index, 0, null);
        }
    }
}

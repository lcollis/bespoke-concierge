import { Component, OnInit, } from '@angular/core';
import { DatePipe } from "@angular/common";
import {Router} from '@angular/router';
import { TaskService } from "../../../services/taskServices/task.service";
import { UserIdService } from "../../../services/userId.service";
import { ToLocalTimePipe } from "../../../pipes/toLocalTime.pipe";
import { MomentPipe } from "../../../pipes/moment.pipe";
import { Task } from '../../../services/taskServices/task';


@Component({
    selector: 'staffHome',
    templateUrl: 'pages/ownerPages/ownerHome/ownerHome.html',
    styleUrls: ['pages/ownerPages/ownerHome/ownerHome.css'],
    pipes: [ToLocalTimePipe, MomentPipe]
})
export class OwnerHomeComponent {

    tasks: Task[];
    userID: string;
    loading: boolean = true;
    noTasks: boolean = false;

    constructor(private _router: Router, private _taskService: TaskService, private _userIdService: UserIdService) {
        _userIdService.getUserId().then((userID: string) => {
            this.userID = userID;
            _taskService.getAllTasks()
                .subscribe((tasks: Task[]) => {
                    if (tasks) {
                        try {
                            tasks = this.sortTasks(tasks, parseInt(userID));
                            this.insertSeparators(tasks, parseInt(userID));
                            this.tasks = tasks;
                        } catch (error) {
                            console.log("got error: " + error);
                            this.noTasks = true;
                        }
                    } else {
                        this.noTasks = true;
                    }
                    this.loading = false;
                }, (error: any) => {
                    console.log("error getting tasks");
                    console.log(error);
                });
        });
    }

    sortTasks(tasks: Task[], userID: number): Task[] {
        var completed: Task[] = tasks.filter((task) => { return task.Completed });
        var notCompleted: Task[] = tasks.filter((task) => { return !task.Completed });

        var notCompleteUnassigned = notCompleted.filter((task) => { return task.PersonID === 1 });
        var notCompleteAssignedToMe = notCompleted.filter((task) => { return task.PersonID === userID });
        var notCompleteAssignedToOther = notCompleted.filter((task) => { return task.PersonID !== 1 && task.PersonID !== userID });

        //sort lists by created timestamp 
        notCompleteAssignedToMe = notCompleteAssignedToMe.sort(function (c, d) {
            var a = c.CreatedTimestamp;
            var b = d.CreatedTimestamp;
            return a > b ? 1 : a < b ? -1 : 0;
        });

        notCompleteUnassigned = notCompleteUnassigned.sort(function (c, d) {
            var a = c.CreatedTimestamp;
            var b = d.CreatedTimestamp;
            return a > b ? 1 : a < b ? -1 : 0;
        });

        notCompleteAssignedToOther = notCompleteAssignedToOther.sort(function (c, d) {
            var a = c.CreatedTimestamp;
            var b = d.CreatedTimestamp;
            return a > b ? 1 : a < b ? -1 : 0;
        });

        completed = completed.sort(function (c, d) {
            var a = c.CreatedTimestamp;
            var b = d.CreatedTimestamp;
            return a > b ? 1 : a < b ? -1 : 0;
        });

        //make the list 1. not completed and assigned to me 2. not completed and unassigned 3. not complete assigned to other staff  4. completed
        return notCompleteAssignedToMe.concat(notCompleteUnassigned, notCompleteAssignedToOther, completed);
    }

    insertSeparators(tasks: Task[], userID: number) {
        //does separator by setting short description to name of separator and its parsed in the html

        //insert My working request separator
        if (tasks[0].PersonID === userID && tasks[0].Completed === false) {
            tasks.unshift(new Task(null, "my working requests", null, null, null));
        }

        //insert Unassigned requests separator
        for (var i = 0; i < tasks.length; i++) {
            var task: Task = tasks[i];
            //make sure its not a separator
            if (task.Description) {
                //if unnasigned
                if (task.PersonID === 1) {
                    tasks.splice(i, 0, new Task(null, "unassigned uncompleted requests", null, null, null));
                    break;
                }
            }
        }

        //insert My completed requests separator
        for (var i = 0; i < tasks.length; i++) {
            var task: Task = tasks[i];
            //make sure its not a separator
            if (task.Description) {
                //if completed
                if (task.Completed === true) {
                    tasks.splice(i, 0, new Task(null, "completed requests", null, null, null));
                    break;
                }
            }
        }
    }

    formatRequestInfo(task: Task): string {
        var output: string = task.UserID + " | " + "room 100";
        return output;
    }

    formatDate(task: Task) {
        if(task.Completed) {
            return task.TaskCompletedTimestamp;
        } else {
            return task.CreatedTimestamp;
        }
    }

    onItemTap(args) {
        var index = args.index;
        var task: Task = this.tasks[index];
        //dont go if its a separator
        if (task.Description) {
            this._taskService.selectedTask = task;
            this._taskService.isSelectedTaskAssignedToMe = task.PersonID === parseInt(this.userID);
            this._router.navigate(['/OwnerScreen/TaskDetail']);
        }
    }
}

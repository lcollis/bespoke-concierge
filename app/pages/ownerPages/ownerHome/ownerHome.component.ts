import { Component, OnInit, } from '@angular/core';
import { DatePipe } from "@angular/common";
import {Router} from '@angular/router';
import { TaskService } from "../../../services/taskServices/task.service";
import { UserIdService } from "../../../services/userId.service";
import { ToLocalTimePipe } from "../../../pipes/toLocalTime.pipe";
import { MomentPipe } from "../../../pipes/moment.pipe";
import { Task } from '../../../services/taskServices/task';
import { registerElement, ViewClass } from "nativescript-angular/element-registry";


@Component({
    selector: 'staffHome',
    templateUrl: 'pages/ownerPages/ownerHome/ownerHome.html',
    styleUrls: ['pages/ownerPages/ownerHome/ownerHome.css'],
})
export class OwnerHomeComponent {

    tasks: Task[];
    userID: string;
    loading: boolean = true;
    noTasks: boolean = false;

    constructor(private _router: Router, private _taskService: TaskService, private _userIdService: UserIdService) {
        this.getTasks(this);
        this._taskService.setUpdateTaskListCallback(this.getTasks, this);

        try {
            registerElement("PullToRefresh", () => {
                var viewClass = require("nativescript-pulltorefresh").PullToRefresh;
                return viewClass;
            });
        } catch (error) {}
    }

    getTasks(thisObject: OwnerHomeComponent, doneLoadingCallback?: () => any) {
        thisObject._userIdService.getUserId().then((userID: string) => {
            thisObject.userID = userID;
            thisObject._taskService.getAllTasks()
                .subscribe((tasks: Task[]) => {
                    if (tasks) {
                        try {
                            tasks = thisObject.sortTasks(tasks, parseInt(userID));
                            thisObject.insertSeparators(tasks, parseInt(userID));
                            thisObject.tasks = tasks;
                        } catch (error) {
                            console.log("got error: " + error);
                            thisObject.noTasks = true;
                        }
                    } else {
                        thisObject.noTasks = true;
                    }
                    thisObject.loading = false;
                    if(doneLoadingCallback) {
                        doneLoadingCallback();
                    }
                }, (error: any) => {
                    console.log("error getting tasks");
                    console.log(error);
                });
        });
    }

    sortTasks(tasks: Task[], userID: number): Task[] {
        var completed: Task[] = tasks.filter((task) => { return task.Completed });
        var notCompleted: Task[] = tasks.filter((task) => { return !task.Completed });

        var today: Date = new Date();
        var oneWeek = 7 * 24 * 60 * 60 * 1000; //one week in milliseconds 7 days of 24 hours of 60 minutes of 60 seconds of 1000 milliseconds
        var completedInLastWeek: Task[] = completed.filter((task) => {
            var completedDate: Date = new Date(task.TaskCompletedTimestamp.toString());
            return today.getTime() - completedDate.getTime() < oneWeek;
        });

        var notCompleteUnassigned = notCompleted.filter((task) => { return task.PersonID === -1 });
        var notCompleteAssignedToMe = notCompleted.filter((task) => { return task.PersonID === userID });
        var notCompleteAssignedToOther = notCompleted.filter((task) => { return task.PersonID !== -1 && task.PersonID !== userID });

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

        completedInLastWeek = completedInLastWeek.sort(function (c, d) {
            var a = c.CreatedTimestamp;
            var b = d.CreatedTimestamp;
            return a > b ? 1 : a < b ? -1 : 0;
        });

        //make the list 1. not completed and assigned to me 2. not completed and unassigned 3. not complete assigned to other staff  4. completed in last week
        return notCompleteAssignedToMe.concat(notCompleteUnassigned, notCompleteAssignedToOther, completedInLastWeek);
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
                if (task.PersonID === -1) {
                    tasks.splice(i, 0, new Task(null, "unassigned uncompleted requests", null, null, null));
                    break;
                }
            }
        }

        //insert Assigned to other Request separator
        for (var i = 0; i < tasks.length; i++) {
            var task: Task = tasks[i];
            //make sure its not a separator
            if (task.Description) {
                //if assigned and uncompleted
                if (task.PersonID !== userID && task.PersonID !== -1 && task.Completed === false) {
                    tasks.splice(i, 0, new Task(null, "assigned uncompleted requests", null, null, null));
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
        if (task.Completed) {
            return task.TaskCompletedTimestamp;
        } else {
            return task.CreatedTimestamp;
        }
    }

    getOpenCount(): number {
        var count = 0;
        this.tasks.forEach((t) => {
            if(t.Description && t.Completed === false) count++;
        });
        return count;
    }
    
    getClaimedCount(): number {
        var count = 0;
        this.tasks.forEach((t) => {
            if(t.Description && t.Completed === false && t.PersonID != -1) count++;
        });
        return count;
    }

    getClosedCount(): number {
        var count = 0;
        this.tasks.forEach((t) => {
            if(t.Description && t.Completed === true) count++;
        });
        return count;
    }
    
    getPraiseCount(): number {
        var count = 0;
        this.tasks.forEach((t) => {
            count += t.Clap;
        });
        return count;
    }

    refreshList(args) {
        var pullRefresh = args.object;
        this.getTasks(this, () => { 
            pullRefresh.refreshing = false;
        });
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

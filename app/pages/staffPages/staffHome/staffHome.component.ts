import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TaskService } from "../../../services/taskServices/task.service";
import { ToLocalTimePipe } from "../../../pipes/toLocalTime.pipe";
import { Task } from '../../../services/taskServices/task';


@Component({
    selector: 'staffHome',
    templateUrl: 'pages/staffPages/staffHome/staffHome.html',
    styleUrls: ['pages/staffPages/staffHome/staffHome.css'],
    pipes: [ToLocalTimePipe]
})
export class StaffHomeComponent {

    tasks: Task[];
    loading: boolean = true;

    constructor(private _router: Router, private _taskService: TaskService) {
        _taskService.getAllTasks()
            .subscribe((tasks: Task[]) => {
                this.tasks = tasks;
                this.loading = false;
            }, (error: any) => {
                console.log(error);
            });
    }

    formatRequestInfo(task: Task): string {
        var output: string = task.UserID + " | " + "rm#" + " | " + "phone#";
        return output;
    }

    onItemTap(args) {

        var index = args.index;
        var task: Task = this.tasks[index];
        this._taskService.selectedTask = task;
        this._router.navigate(['/StaffScreen/TaskDetail']);
    }
}

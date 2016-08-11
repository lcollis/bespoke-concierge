import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TaskService } from "../../../services/taskServices/task.service";
import { UserIdService } from "../../../services/userId.service";
import { Task } from '../../../services/taskServices/task';

@Component({
    selector: 'staffTaskDetail',
    templateUrl: 'pages/staffPages/staffTaskDetail/staffTaskDetail.html',
    styleUrls: ['pages/staffPages/staffTaskDetail/staffTaskDetail.css']
})
export class StaffTaskDetailComponent {

    task: Task;
    isTaskAssignedToMe: boolean;

    constructor(private _router: Router, private _taskService: TaskService, private _userIdService: UserIdService) {
        this.task = _taskService.selectedTask;
        this.isTaskAssignedToMe = _taskService.isSelectedTaskAssignedToMe;
    }

    updateNote() {
        console.log(this.task.FollowupNotes);
        this.updateTask();
    }

    unassign() {
        this.task.PersonID = 1;
        this.updateTask();
        this.isTaskAssignedToMe = false ;
        this.updateTask();
    }

    take() {
        console.log("taking task");
        this._userIdService.getUserId().then((userID: string) => {
            this.task.PersonID = parseInt(userID); 
            this.isTaskAssignedToMe = true;
            this.updateTask();
        });
    }

    complete() {
        this.task.Completed = true;
        this.task.TaskCompletedTimestamp = new Date();
        this.updateTask();
    }

    private updateTask() {
        this._taskService.updateTask(this.task)
            .subscribe((response: any) => {
                console.log(response);
            }, (error: any) => {
                console.log(error);
            });
    }

}
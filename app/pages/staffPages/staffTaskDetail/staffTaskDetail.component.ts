import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TaskService } from "../../../services/taskServices/task.service";
import { UserIdService } from "../../../services/userId.service";
import { DatabaseService } from "../../../services/database.service";
import { AdminChatService } from "../../../services/chatServices/adminChat.service";
import { Task } from '../../../services/taskServices/task';
import { User } from "../../../services/user";

@Component({
    selector: 'staffTaskDetail',
    templateUrl: 'pages/staffPages/staffTaskDetail/staffTaskDetail.html',
    styleUrls: ['pages/staffPages/staffTaskDetail/staffTaskDetail.css']
})
export class StaffTaskDetailComponent {

    task: Task;
    isTaskAssignedToMe: boolean;

    hasButler: boolean = false;
    taskAssignedToButler: boolean = false;
    butlerID: number = -1;

    constructor(private _router: Router, private _taskService: TaskService, private _userIdService: UserIdService, private _chatService: AdminChatService, private _dbService: DatabaseService) {
        this.task = _taskService.selectedTask;
        this.isTaskAssignedToMe = _taskService.isSelectedTaskAssignedToMe;
        this._dbService.getApiData("Users")
            .subscribe((response: any) => {
                var users: User[] = response._body;
                users.forEach((user) => {
                    if(user.UserTypeID === 5) {
                        this.hasButler = true;
                        this.butlerID = user.CMSUserID;
                        if(this.task.UserID === this.butlerID) {
                            this.taskAssignedToButler = true;
                        }
                    }
                });
            }, (error: any) => {
                console.log(error);
            });
    }

    updateNote() {
        console.log(this.task.FollowupNotes);
        this.updateTask();
    }

    unassign() {
        this.task.PersonID = -1;
        this.isTaskAssignedToMe = false;
        this.taskAssignedToButler = false;
        this.updateTask();
    }

    take() {
        console.log("taking task");
        this._userIdService.getUserId().then((userID: string) => {
            this.task.PersonID = parseInt(userID); 
            this.isTaskAssignedToMe = true;
            this.taskAssignedToButler = false;
            this.updateTask();
        });
    }

    complete() {
        this.task.Completed = true;
        this.task.TaskCompletedTimestamp = new Date();
        this.updateTask();
    }

    uncomplete() {
        this.task.Completed = false;
        this.task.TaskCompletedTimestamp = new Date();
        this.updateTask();
    }

    message() {
        this._chatService.selectedChatUserID = this.task.UserID.toString();
        this._router.navigate(['/StaffScreen/Chat']);
    }

    assignToButler() {
        this.task.PersonID = this.butlerID;
        this.taskAssignedToButler = true;
        this.isTaskAssignedToMe = false;
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

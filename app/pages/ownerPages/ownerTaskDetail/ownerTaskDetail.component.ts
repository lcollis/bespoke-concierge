import { Component, ViewChild, NgZone } from '@angular/core';
import { NgClass } from "@angular/common";
import {Router} from '@angular/router';
import { DatabaseService } from "../../../services/database.service";
import { TaskService } from "../../../services/taskServices/task.service";
import { UserIdService } from "../../../services/userId.service";
import { AdminChatService } from "../../../services/chatServices/adminChat.service";
import { Task } from '../../../services/taskServices/task';
import { User } from "../../../services/user";

@Component({
    selector: 'ownerTaskDetail',
    templateUrl: 'pages/ownerPages/ownerTaskDetail/ownerTaskDetail.html',
    styleUrls: ['pages/ownerPages/ownerTaskDetail/ownerTaskDetail.css'],
})
export class OwnerTaskDetailComponent {

    task: Task;
    isTaskAssignedToMe: boolean;
    staff: User[];

    selectedCMSUserID: number = -1;

    loading: boolean = true;


    @ViewChild("lv") listView;

    constructor(private _router: Router, private _taskService: TaskService, private _userIdService: UserIdService, private _chatService: AdminChatService, private _databaseService: DatabaseService) {
        this.task = _taskService.selectedTask;
        this.isTaskAssignedToMe = _taskService.isSelectedTaskAssignedToMe;
        this.selectedCMSUserID = this.task.PersonID;

        this._databaseService.getApiData("Users")
            .subscribe((users) => {
                this.staff = new Array();
                this.staff.unshift(User.NoUser); //add in the no user option
                this.staff.unshift(null);   //put a null item in first to show task details (its weird I know)
                this.staff = this.staff.concat(users._body);
                this.loading = false;
                console.log("constructor " + JSON.stringify(this.staff));
            }, (error: any) => {
                console.log(error);
            });
    }

    updateNote() {
        console.log(this.task.FollowupNotes);
        this.updateTask();
    }

    itemTapped(args) {
        if (args.index != 0) {
            var selectedIndex = args.index;
            this.selectedCMSUserID = this.staff[selectedIndex].CMSUserID;
            this.listView._elementRef.nativeElement.refresh();
        }
    }

    unassign() {
        this.task.PersonID = -1;
        this.isTaskAssignedToMe = false;
        this.updateTask();
    }

    assign() {
        this.task.PersonID = this.selectedCMSUserID;
        this.updateTask();
    }

    take() {
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

    uncomplete() {
        this.task.Completed = false;
        this.task.TaskCompletedTimestamp = new Date();
        this.updateTask();
    }

    message() {
        this._chatService.selectedChatUserID = this.task.UserID.toString();
        this._router.navigate(['/OwnerScreen/Chat']);
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

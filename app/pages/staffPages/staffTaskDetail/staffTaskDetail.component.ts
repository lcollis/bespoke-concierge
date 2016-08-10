import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TaskService } from "../../../services/taskServices/task.service";
import { Task } from '../../../services/taskServices/task';

@Component({
    selector: 'staffTaskDetail',
    templateUrl: 'pages/staffPages/staffTaskDetail/staffTaskDetail.html',
    styleUrls: ['pages/staffPages/staffTaskDetail/staffTaskDetail.css']
})
export class StaffTaskDetailComponent {

    task: Task;

    constructor(private _router:Router, private _taskService: TaskService) { 
        this.task = _taskService.selectedTask;
    }


    unassign() {

    }

    complete() {

    }

}
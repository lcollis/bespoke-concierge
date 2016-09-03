import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Rx';
import { DatabaseService } from "../database.service";
import { Task } from "./task";

@Injectable()
export class TaskService {

    selectedTask: Task;
    isSelectedTaskAssignedToMe: boolean;

    private updateTaskListCallback: (thisObject: any) => any;
    private updateTaskListCallbackThis: any;

    constructor(private _databaseService: DatabaseService) { }

    sendTask(task: Task): Observable<any> {
        return this._databaseService.postObject("Tasks", task);
    }

    getTasks(userID: number): Observable<Task[]> {
        return this.getAllTasks()
            .map((data: Task[]) => {
                var output: Task[] = new Array();

                data.forEach(task => {
                    if(task.UserID === userID) {
                        output.push(task);
                    }
                });

                return output;
        });
    }

    getAllTasks(): Observable<Task[]> {
        return this._databaseService.getApiData("Tasks")
            .map((data) => {
                return data._body;
            });
    }


    updateTask(task: Task): Observable<any> {
        return this._databaseService.putObject("Tasks", task, task.TaskID);
    }

    setUpdateTaskListCallback(callback: (thisObject: any) => any, thisObject: any) {
        this.updateTaskListCallback = callback;
        this.updateTaskListCallbackThis = thisObject;
    }

    callUpdateTaskListCallback() {
        this.updateTaskListCallback(this.updateTaskListCallbackThis);
    }
}

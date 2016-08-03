import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Rx';
import { DatabaseService } from "../database.service";
import { Task } from "./task";

@Injectable()
export class TaskService {

    constructor(private _databaseService: DatabaseService) { }

    sendTask(task: Task): Observable<any> {
        return this._databaseService.postObject("Tasks", task);
    }

    getTasks(userID: number): Observable<Task[]> {
        return this._databaseService.getApiData("Tasks")
            .map((data) => {
                return data._body;
            })
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

}
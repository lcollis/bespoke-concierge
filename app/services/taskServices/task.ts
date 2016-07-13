export class Task {
    requesterID: string;
    timeOfRequest: Date; //time the request was made
    completed: boolean = false;
    assignedToID: string = ""; //ID of the assignee
    description: string;

    constructor(requesterID: string, timeOfRequest: Date, description: string) {
        this.requesterID = requesterID;
        this.timeOfRequest = timeOfRequest;
        this.description = description;
        this.completed = false;
        this.assignedToID = "";
    }
}
export class Task {

    static Priorities = ["normal", "high", "urgent"];

    AutomatedFollowUpTask: boolean;
    Canceled: boolean;
    Clap: number;
    Completed: boolean;
    CreatedTimestamp: Date;
    Description: string;
    EndTimestamp: Date;
    FollowupNotes: string;
    PersonID: number;
    Priority: string;
    PrivateTask: boolean;
    RemindDayOfTask: boolean;
    RemindIfDayLate: boolean;
    ScheduledTime: string;
    ScheduledTimestamp: Date;
    ShortDescription: string;
    StartTimestamp: Date;
    TaskCanceledTimestamp: Date;
    TaskCompletedTimestamp: Date;
    TaskID: number;
    UserID: number;

    constructor(description: string, shortDescription: string, scheduledTime: Date, priority: string, userID: number) {
        this.AutomatedFollowUpTask = false;
        this.Canceled = false;
        this.Clap = 0;
        this.Completed = false;
        this.CreatedTimestamp = new Date();
        this.Description = description;
        this.EndTimestamp = new Date(0);
        this.FollowupNotes = "";
        this.PersonID = -1;
        this.Priority = priority;
        this.PrivateTask = false;
        this.RemindDayOfTask = false;
        this.RemindIfDayLate = false;
        this.ScheduledTime = "";
        this.ScheduledTimestamp = scheduledTime;
        this.ShortDescription = shortDescription;
        this.StartTimestamp = new Date(0);
        this.TaskCanceledTimestamp = new Date(0);
        this.TaskCompletedTimestamp = new Date(0);
        this.TaskID = 1;
        this.UserID = userID;
    }
}

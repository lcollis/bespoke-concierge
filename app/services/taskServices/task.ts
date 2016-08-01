export class Task {
    TaskID: number;
    UserID: number;
    Description: string;
    CreatedTimestamp: Date;
    Priority: string;
    StartTimestamp: Date;
    EndTimestamp: Date;
    PersonID: number;
    TaskCompletedTimestamp: Date;
    TaskCanceledTimestamp: Date;
    FollowupNotes: string;
    ScheduledTime: string;
    Completed: boolean;
    Canceled: boolean;
    ShortDescription: string;
    ScheduledTimestamp: Date;
    RemindDayOfTask: boolean;
    RemindIfDayLate: boolean;
    PrivateTask: boolean;
    AutomatedFollowUpTask: boolean;
}
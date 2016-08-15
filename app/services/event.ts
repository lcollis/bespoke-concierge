export class Event {
    EventID: number;
    SubEventID: number;
    CalendarID: number;
    Subject: string;
    Description: string;
    ShortDescription: string;
    StartTime: string;
    EndTime: string;
    ContactName: string;
    ContactPhone: string;
    ContactEmail: string;
    RequiresRSVP: boolean;
    IsRecurrentEvent: boolean;
    IsFeaturedEvent: boolean;
    EventImageID: number;
    EventThumbnailImageID: number;
    EventImageUrl: string;
    EventThumbnailImageUrl: string;

    constructor(subject: string, description: string, startTime: Date, endTime: Date) {
        this.Subject = subject;
        this.Description = description;
        this.StartTime = startTime.toString();
        this.EndTime = endTime.toString();
    }
}

export class ItineraryEvent {
    BookTimeStamp: Date;
    EventID: number;
    EventItenaryID: number;
    IsCancled: boolean;
    IsCompleted: boolean;
    PersonID: number;
    SubEventID: number;

    constructor(event: Event, userID: number) {
        this.BookTimeStamp = new Date();
        this.EventID = event.EventID;
        this.IsCancled = true;
        this.IsCompleted = false;
        this.PersonID = userID;
        this.SubEventID = event.SubEventID;
    }
}

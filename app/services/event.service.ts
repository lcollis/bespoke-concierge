import { Injectable } from '@angular/core';
import {Event} from "./Event";

@Injectable()
export class EventService {

    events: Event[] = [
        {
            title: "Sample Event",
            description: "Excepteur sunt quis aliquip ullamco culpa nisi nisi in sit. Reprehenderit ad in consectetur dolore irure ut. Ullamco esse est do anim deserunt velit est deserunt tempor fugiat non sit magna nisi. Adipisicing enim ad voluptate proident exercitation non ea velit cupidatat amet tempor ad esse. Duis eiusmod do et occaecat aliquip ad Lorem dolore nulla fugiat sit velit voluptate elit. Quis magna anim velit qui esse esse duis magna sit.",
            startTime: new Date(),
            endTime: new Date()
        },
        {
            title: "Another Sample Event",
            description: "Dolore fugiat adipisicing occaecat aliqua eu est ad nisi mollit cillum minim adipisicing labore qui. Qui ut aute laborum amet aute incididunt sint elit proident dolor ad. Eu reprehenderit labore excepteur dolor officia laboris anim officia ipsum anim aliqua ipsum. Enim do esse elit dolore qui sunt id consectetur dolor voluptate eu. In fugiat nulla ullamco magna in occaecat exercitation minim.",
            startTime: new Date(),
            endTime: new Date()
        }
    ];

    constructor() { }

    getEvents() {
        return this.events;
    }
}
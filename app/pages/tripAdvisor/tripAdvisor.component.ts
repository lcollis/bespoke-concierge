import { Component } from '@angular/core';
import {Page} from "ui/page";

@Component({
    selector: 'tripAdvisor',
    templateUrl: 'pages/tripAdvisor/tripAdvisor.html',
    styleUrls: ['pages/tripAdvisor/tripAdvisor.css']
})
export class TripAdvisorComponent {

    loading: boolean = true;

    inviteText: string = "Consequat mollit sit incididunt sint do aute aute et velit labore deserunt.";

    constructor(page: Page) {
        page.actionBarHidden = true;
     }

    pageLoaded() {
        this.loading = false;
    }
}
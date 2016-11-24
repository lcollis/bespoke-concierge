import { Component } from '@angular/core';
import {Page} from "ui/page";
import { TextService } from "../../services/text.service";

@Component({
    selector: 'tripAdvisor',
    templateUrl: 'pages/tripAdvisor/tripAdvisor.html',
    styleUrls: ['pages/tripAdvisor/tripAdvisor.css']
})
export class TripAdvisorComponent {

    loading: boolean = true;

    inviteText: string;

    constructor(page: Page, private _textService: TextService) {
        page.actionBarHidden = true;
        this.inviteText = this._textService.getText().tripAdvisorText;
     }

    pageLoaded() {
        this.loading = false;
    }
}

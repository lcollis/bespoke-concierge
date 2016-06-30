import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router-deprecated";
import {FaqService} from "../../services/faq.service";

@Component({
    selector: 'faq',
    templateUrl: 'pages/faq/faq.html',
    styleUrls: ['pages/faq/faq.css'],
    providers: [FaqService]
})

export class FaqComponent implements OnInit {

    faq: string;

    constructor(private _router: Router, faqService: FaqService) {
        this.faq = faqService.getFaq();
    }

    ngOnInit() { }

    onNavBtnTap() {
        this._router.navigate(["Home"]);
    }
}
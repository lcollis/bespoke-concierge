import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FaqService} from "../../services/faq.service";
import { Faq } from "../../services/Faq";
import appModule = require("application");

@Component({
    selector: 'faq',
    templateUrl: 'pages/faq/faq.html',
    styleUrls: ['pages/faq/faq.css'],
    providers: [FaqService]
})

export class FaqComponent implements OnInit {
    faq: Faq[];
   
    loading: boolean = true;

    constructor(private _router: Router, private faqService:FaqService) {
        faqService.loadFaq().subscribe(
            faq => this.getFaq(faq),
            error => this.receivingError(error));
    }
  
    getFaq(faq) {
        this.faq = faq._body;
        this.loading = false;
    }
    receivingError(error) {
        console.error(error.status);
        alert("No Internet Connection");
        this._router.navigate(["/Home"]);
    }
    ngOnInit() { }

    onNavBtnTap() {
        this._router.navigate(["/Home"]);
    }
}
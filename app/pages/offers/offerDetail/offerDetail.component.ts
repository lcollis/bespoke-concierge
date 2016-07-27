import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Offer } from "../../../services/offer"
import {DatabaseService} from "../../../services/database.service";

@Component({
    selector: 'offerDetail',
    templateUrl: 'pages/offers/offerDetail/offerDetail.html',
    styleUrls: ['pages/offers/offerDetail/offerDetail.css']
})
export class OfferDetailComponent implements OnInit {

    offer: any;

    constructor(private _router: Router, private _databaseService: DatabaseService) {
        this.offer = _databaseService.getSelectedObject("Offer");;
    }

    ngOnInit() { }

    onNavBtnTap() {
        this._router.navigate(["/Offers"]);
    }

}
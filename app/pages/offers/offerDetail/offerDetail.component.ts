import { Component, OnInit } from '@angular/core';
import { Offer } from "../../../services/offer"
import { Router } from "@angular/router";
import { OfferService } from "../../../services/offer.service"

@Component({
    selector: 'offerDetail',
    templateUrl: 'pages/offers/offerDetail/offerDetail.html',
    styleUrls: ['pages/offers/offerDetail/offerDetail.css']
})
export class OfferDetailComponent implements OnInit {

    offer: any;

    constructor(_offerService: OfferService, private _router: Router) {
        this.offer = _offerService.selectedOffer;
    }

    ngOnInit() { }

    onNavBtnTap() {
        this._router.navigate(["Offers"]);
    }

}
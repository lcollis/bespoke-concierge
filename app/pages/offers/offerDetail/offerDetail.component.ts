import { Component, OnInit } from '@angular/core';
import { Offer } from "../../../services/offer"
import { RouteParams, Router } from "@angular/router-deprecated";
import { OfferService } from "../../../services/offer.service"

@Component({
    selector: 'offerDetail',
    templateUrl: 'pages/offers/offerDetail/offerDetail.html',
    styleUrls: ['pages/offers/offerDetail/offerDetail.css'],
    providers: [OfferService]
})
export class OfferDetailComponent implements OnInit {

    offer: Offer;

    constructor(params: RouteParams, _offerService: OfferService, private _router: Router) {
        var offerID: number = Number(params.get('index'));
        this.offer = _offerService.getOffers()[offerID];
    }

    ngOnInit() { }

    onNavBtnTap() {
        this._router.navigate(["Offers"]);
    }

}
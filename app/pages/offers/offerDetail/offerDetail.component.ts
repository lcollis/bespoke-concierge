import { Component, OnInit } from '@angular/core';
import { Offer } from "../../../services/offer"
import { RouteParams } from "@angular/router-deprecated";
import { OfferService } from "../../../services/offer.service"

@Component({
    selector: 'offerDetail',
    templateUrl: 'pages/offers/offerDetail/offerDetail.html',
    styleUrls: ['pages/offers/offerDetail/offerDetail.css'],
    providers: [OfferService]
})
export class OfferDetailComponent implements OnInit {

    offer: Offer;

    constructor(params: RouteParams, _offerService: OfferService) {
        var offerID : number = Number(params.get('index'));

        console.log("+++++++ index number: " + offerID);
        
        this.offer = _offerService.getOffers()[offerID];
        console.log("+++++++ got offer: " + this.offer.OfferName);
        
    }

    ngOnInit() { }

}
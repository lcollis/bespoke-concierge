import { Component, OnInit } from '@angular/core';
import { OfferService } from "../../services/offers.service";
import { Offer } from "../../services/offer";

@Component({
    selector: 'offers',
    templateUrl: 'pages/offers/offers.html',
    styleUrls: ['pages/offers/offers.css'],
    providers: [OfferService]
})
export class OffersComponent implements OnInit {
    offers: Offer[];

    constructor(_offer: OfferService) { 
        this.offers = _offer.getOffers();
    }

    onItemTap($event) {

    }

    ngOnInit() { }

}
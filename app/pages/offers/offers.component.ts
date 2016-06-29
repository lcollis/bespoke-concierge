import { Component, OnInit } from '@angular/core';
import { OfferService } from "../../services/offer.service";
import { Offer } from "../../services/offer";
import {Router} from "@angular/router-deprecated";

@Component({
    selector: 'offers',
    templateUrl: 'pages/offers/offers.html',
    styleUrls: ['pages/offers/offers.css'],
    providers: [OfferService]
})
export class OffersComponent implements OnInit {
    offers: Offer[];

    constructor(_offer: OfferService, private _router: Router) { 
        this.offers = _offer.getOffers();        
    }

    onItemTap(args) {
        var offerIndex : number = args.index;
        this._router.navigate(["OfferDetail", {index: offerIndex}]);
    }

    ngOnInit() { }

}
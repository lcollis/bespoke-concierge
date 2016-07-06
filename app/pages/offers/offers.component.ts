import { Component, OnInit } from '@angular/core';
import { OfferService } from "../../services/offer.service";
import { Offer } from "../../services/offer";
import {Router} from "@angular/router-deprecated";

@Component({
    selector: 'offers',
    templateUrl: 'pages/offers/offers.html',
    styleUrls: ['pages/offers/offers.css']
})
export class OffersComponent implements OnInit {
    offers: Offer[];
    loading: boolean = true;

    constructor(private _offer: OfferService, private _router: Router) {
        _offer.loadOffers().subscribe(
            offers => this.gotOffers(offers),
            error => this.receivingError(error));
    }

    gotOffers(offers) {
        this.offers = offers._body;
        this.loading = false;
    }

    receivingError(error) {
        console.error(error.status);
        alert("No Internet Connection");
        this._router.navigate(["Home"]);
    }

    onItemTap(args) {
        var selectedOffer: Offer = this.offers[args.index];
        this._offer.selectedOffer = selectedOffer;
        this._router.navigate(["OfferDetail"]);
    }

    onNavBtnTap() {
        this._router.navigate(["Home"]);
    }

    ngOnInit() { }

}
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";
import { Offer } from "../../services/offer";
import { TextService } from "../../services/text.service";

@Component({
    selector: 'offers',
    templateUrl: 'pages/offers/offers.html',
    styleUrls: ['pages/offers/offers.css']
})
export class OffersComponent implements OnInit {
    offers: Offer[];
    loading: boolean = true;

    constructor(private _router: Router, private _databaseService: DatabaseService, private _textService: TextService) {
        _databaseService.getApiData("Offer").subscribe(
            offers => this.gotOffers(offers),
            error => this.receivingError(error));
    }

    gotOffers(offers) {
        this.offers = offers._body;
        this.loading = false;
    }

    receivingError(error) {
        console.error(error.status);
        alert(this._textService.getText().serverError);
        this._router.navigate(["/Home"]);
    }

    onItemTap(args) {
        var selectedOffer: Offer = this.offers[args.index];
        this._databaseService.setSelectedObject("Offer", selectedOffer);
        this._router.navigate(["/GuestScreen/OfferDetail"]);
    }

    onNavBtnTap() {
        this._router.navigate(["/GuestScreen/Home"]);
    }

    ngOnInit() { }

}

import { Injectable } from '@angular/core';
import {Offer} from "./offer";

@Injectable()
export class OfferService {

    offers: Offer[] = [
        {
            OfferID: 1,
            OfferName: "Fake Offer",
            OfferCampaignID: 1,
            OfferContent: "This is a fake offer and this is it's fake content",
            PromoCode: "FAKE",
            ExpirationDate: new Date("August 25, 2016")
        },
        {
            OfferID: 2,
            OfferName: "Another Offer",
            OfferCampaignID: 1,
            OfferContent: "This is a different offer",
            PromoCode: "ANOTHER",
            ExpirationDate: new Date("July 7, 2016")
        }
    ];

    getOffers() {
        return this.offers;
    }

}
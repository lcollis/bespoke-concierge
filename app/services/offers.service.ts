import { Injectable } from '@angular/core';
import {Offer} from "./offer";

@Injectable()
export class OfferService {

    offers: Offer[] = [
        {
            OfferID: 1,
            OfferName: "Fake Offer",
            OfferCampaignID: 1,
            OfferContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vulputate nibh sem, rutrum faucibus magna blandit eget. Praesent id convallis risus, eu placerat arcu. Etiam luctus quis felis id blandit. Vestibulum vel turpis ante. Sed interdum ultricies augue, non feugiat eros. Sed justo dui, efficitur vitae velit ut, tristique blandit metus. Proin ut sollicitudin nulla, at dictum enim. Donec vulputate consequat finibus.",
            PromoCode: "FAKE",
            ExpirationDate: new Date("August 25, 2016")
        },
        {
            OfferID: 2,
            OfferName: "Another Offer",
            OfferCampaignID: 1,
            OfferContent: "Nullam volutpat mollis lacus, nec pharetra arcu sollicitudin non. Nunc id dolor vel velit mollis volutpat ut vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, bibendum a lobortis at, sodales vel tortor. Aliquam convallis risus eget augue dapibus, nec varius nibh fringilla. Etiam dignissim massa imperdiet augue auctor blandit. Sed blandit at nisi vitae convallis. Proin in purus suscipit, suscipit neque nec, finibus nisi.",
            PromoCode: "ANOTHER",
            ExpirationDate: new Date("July 7, 2016")
        },
        {
            OfferID: 2,
            OfferName: "Another Offer",
            OfferCampaignID: 1,
            OfferContent: "Nullam volutpat mollis lacus, nec pharetra arcu sollicitudin non. Nunc id dolor vel velit mollis volutpat ut vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, bibendum a lobortis at, sodales vel tortor. Aliquam convallis risus eget augue dapibus, nec varius nibh fringilla. Etiam dignissim massa imperdiet augue auctor blandit. Sed blandit at nisi vitae convallis. Proin in purus suscipit, suscipit neque nec, finibus nisi.",
            PromoCode: "ANOTHER",
            ExpirationDate: new Date("July 7, 2016")
        },
        {
            OfferID: 2,
            OfferName: "Another Offer",
            OfferCampaignID: 1,
            OfferContent: "Nullam volutpat mollis lacus, nec pharetra arcu sollicitudin non. Nunc id dolor vel velit mollis volutpat ut vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, bibendum a lobortis at, sodales vel tortor. Aliquam convallis risus eget augue dapibus, nec varius nibh fringilla. Etiam dignissim massa imperdiet augue auctor blandit. Sed blandit at nisi vitae convallis. Proin in purus suscipit, suscipit neque nec, finibus nisi.",
            PromoCode: "ANOTHER",
            ExpirationDate: new Date("July 7, 2016")
        },
        {
            OfferID: 2,
            OfferName: "Another Offer",
            OfferCampaignID: 1,
            OfferContent: "Nullam volutpat mollis lacus, nec pharetra arcu sollicitudin non. Nunc id dolor vel velit mollis volutpat ut vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, bibendum a lobortis at, sodales vel tortor. Aliquam convallis risus eget augue dapibus, nec varius nibh fringilla. Etiam dignissim massa imperdiet augue auctor blandit. Sed blandit at nisi vitae convallis. Proin in purus suscipit, suscipit neque nec, finibus nisi.",
            PromoCode: "ANOTHER",
            ExpirationDate: new Date("July 7, 2016")
        },
        {
            OfferID: 2,
            OfferName: "Another Offer",
            OfferCampaignID: 1,
            OfferContent: "Nullam volutpat mollis lacus, nec pharetra arcu sollicitudin non. Nunc id dolor vel velit mollis volutpat ut vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, bibendum a lobortis at, sodales vel tortor. Aliquam convallis risus eget augue dapibus, nec varius nibh fringilla. Etiam dignissim massa imperdiet augue auctor blandit. Sed blandit at nisi vitae convallis. Proin in purus suscipit, suscipit neque nec, finibus nisi.",
            PromoCode: "ANOTHER",
            ExpirationDate: new Date("July 7, 2016")
        },
        {
            OfferID: 2,
            OfferName: "Another Offer",
            OfferCampaignID: 1,
            OfferContent: "Nullam volutpat mollis lacus, nec pharetra arcu sollicitudin non. Nunc id dolor vel velit mollis volutpat ut vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, bibendum a lobortis at, sodales vel tortor. Aliquam convallis risus eget augue dapibus, nec varius nibh fringilla. Etiam dignissim massa imperdiet augue auctor blandit. Sed blandit at nisi vitae convallis. Proin in purus suscipit, suscipit neque nec, finibus nisi.",
            PromoCode: "ANOTHER",
            ExpirationDate: new Date("July 7, 2016")
        },
        {
            OfferID: 2,
            OfferName: "Another Offer",
            OfferCampaignID: 1,
            OfferContent: "Nullam volutpat mollis lacus, nec pharetra arcu sollicitudin non. Nunc id dolor vel velit mollis volutpat ut vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, bibendum a lobortis at, sodales vel tortor. Aliquam convallis risus eget augue dapibus, nec varius nibh fringilla. Etiam dignissim massa imperdiet augue auctor blandit. Sed blandit at nisi vitae convallis. Proin in purus suscipit, suscipit neque nec, finibus nisi.",
            PromoCode: "ANOTHER",
            ExpirationDate: new Date("July 7, 2016")
        },
        {
            OfferID: 2,
            OfferName: "Another Offer",
            OfferCampaignID: 1,
            OfferContent: "Nullam volutpat mollis lacus, nec pharetra arcu sollicitudin non. Nunc id dolor vel velit mollis volutpat ut vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, bibendum a lobortis at, sodales vel tortor. Aliquam convallis risus eget augue dapibus, nec varius nibh fringilla. Etiam dignissim massa imperdiet augue auctor blandit. Sed blandit at nisi vitae convallis. Proin in purus suscipit, suscipit neque nec, finibus nisi.",
            PromoCode: "ANOTHER",
            ExpirationDate: new Date("July 7, 2016")
        },
        {
            OfferID: 2,
            OfferName: "Another Offer",
            OfferCampaignID: 1,
            OfferContent: "Nullam volutpat mollis lacus, nec pharetra arcu sollicitudin non. Nunc id dolor vel velit mollis volutpat ut vitae felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis massa, bibendum a lobortis at, sodales vel tortor. Aliquam convallis risus eget augue dapibus, nec varius nibh fringilla. Etiam dignissim massa imperdiet augue auctor blandit. Sed blandit at nisi vitae convallis. Proin in purus suscipit, suscipit neque nec, finibus nisi.",
            PromoCode: "ANOTHER",
            ExpirationDate: new Date("July 7, 2016")
        }
    ];

    getOffers() {
        return this.offers;
    }

}
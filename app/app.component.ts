import { Component } from '@angular/core';
import {RouteConfig} from "@angular/router-deprecated";
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "nativescript-angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {OffersComponent} from "./pages/offers/offers.component";
import {OfferDetailComponent} from "./pages/offers/offerDetail/offerDetail.component";
import {HotelInfoComponent} from "./pages/hotelInfo/hotelInfo.component";
import {FaqComponent } from "./pages/faq/faq.component";
import {WeatherComponent} from "./pages/weather/weather.component";
import {TripAdvisorComponent} from "./pages/tripAdvisor/tripAdvisor.component";
import {SocialMediaComponent} from "./pages/socialMedia/socialMedia.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {RestaurantsComponent} from "./pages/restaurants/restaurants.component";
import {MenuComponent} from "./pages/menu/menu.component";
import {ChatComponent} from "./pages/chat/chat.component";
import {RequestsComponent} from "./pages/requests/requests.component";
import {AdminChatSelectorComponent} from "./pages/adminChatSelector/adminChatSelector.component";
import {AdminChatComponent} from "./pages/adminChatSelector/adminChat/adminChat.component";
import {AdminHomeComponent} from "./pages/adminHome/adminHome.component";

@Component({
  selector: 'app',
  template: `
        <page-router-outlet></page-router-outlet>
    `,
  directives: [NS_ROUTER_DIRECTIVES],
  providers: [NS_ROUTER_PROVIDERS]
})


@RouteConfig([
  { path: '/Home', component: HomeComponent, name: "Home", useAsDefault: true },
  { path: '/Offers', component: OffersComponent, name: "Offers" },
  { path: '/OfferDetail', component: OfferDetailComponent, name: "OfferDetail" },
  { path: '/HotelInfo', component: HotelInfoComponent, name: "HotelInfo" },
  { path: '/Faq', component: FaqComponent, name: 'Faq' },
  { path: '/Weather', component: WeatherComponent, name: 'Weather' },
  { path: '/TripAdvisor', component: TripAdvisorComponent, name: 'TripAdvisor' },
  { path: '/SocialMedia', component: SocialMediaComponent, name: 'SocialMedia' },
  { path: '/Calendar', component: CalendarComponent, name: 'Calendar' },
  { path: '/Restaurants', component: RestaurantsComponent, name: 'Restaurants' },
  { path: '/Chat', component: ChatComponent, name: 'Chat' },
  { path: '/Menu', component: MenuComponent, name: 'Menu' },
  { path: '/Requests', component: RequestsComponent, name: 'Requests' },
  { path: '/AdminChatSelector', component: AdminChatSelectorComponent, name: 'AdminChatSelector' },
  { path: '/AdminChat', component: AdminChatComponent, name: 'AdminChat'},
  { path: '/AdminHome', component: AdminHomeComponent, name: 'AdminHome'},
])


export class AppComponent {
  ngOnInit() { }
}
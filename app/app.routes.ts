import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router"

//components for routing 
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
import { ReservationComponent } from "./pages/restaurants/reservation/reservation.component";


export const routes: RouterConfig = [
    { path: "", component: HomeComponent },
    { path: "Home", component: HomeComponent, },
    { path: 'Offers', component: OffersComponent },
    { path: 'OfferDetail', component: OfferDetailComponent },
    { path: 'HotelInfo', component: HotelInfoComponent },
    { path: 'Faq', component: FaqComponent },
    { path: 'Weather', component: WeatherComponent },
    { path: 'TripAdvisor', component: TripAdvisorComponent },
    { path: 'SocialMedia', component: SocialMediaComponent },
    { path: 'Calendar', component: CalendarComponent },
    { path: 'Restaurants', component: RestaurantsComponent },
    { path: 'Chat', component: ChatComponent },
    { path: 'Menu', component: MenuComponent },
    { path: 'Requests', component: RequestsComponent },
    { path: 'AdminChatSelector', component: AdminChatSelectorComponent },
    { path: 'AdminChat', component: AdminChatComponent },
    { path: 'AdminHome', component: AdminHomeComponent },
    { path: 'Reservation', component: ReservationComponent},
];

export const APP_ROUTER_PROVIDERS = [
    nsProvideRouter(routes, {})
];
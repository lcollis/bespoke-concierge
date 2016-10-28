import { RouterConfig } from "@angular/router";
import { nsProvideRouter } from "nativescript-angular/router"

//components for routing 
import { HomeComponent } from "./pages/home/home.component";
import { OffersComponent } from "./pages/offers/offers.component";
import { OfferDetailComponent } from "./pages/offers/offerDetail/offerDetail.component";
import { HotelInfoComponent } from "./pages/hotelInfo/hotelInfo.component";
import { FaqComponent  } from "./pages/faq/faq.component";
import { WeatherComponent } from "./pages/weather/weather.component";
import { TripAdvisorComponent } from "./pages/tripAdvisor/tripAdvisor.component";
import { SocialMediaComponent } from "./pages/socialMedia/socialMedia.component";
import { CalendarComponent } from "./pages/calendar/calendar.component";
import { RestaurantsComponent } from "./pages/restaurants/restaurants.component";
import { MenuComponent } from "./pages/menu/menu.component";
import { ChatComponent } from "./pages/chat/chat.component";
import { RequestsComponent } from "./pages/requests/requests.component";
import { ReservationComponent } from "./pages/restaurants/reservation/reservation.component";
import { MakeRequestsComponent } from "./pages/makeRequests/makeRequests.component";
import { RequestDetailsComponent } from "./pages/requestDetails/requestDetails.component";
import { ForgotSomethingComponent } from "./pages/forgotSomething/forgotSomething.component";
import { TidyUpComponent } from "./pages/tidyUp/tidyUp.component";
import { MaintenanceComponent } from "./pages/maintenance/maintenance.component";
import { ItineraryComponent } from "./pages/itinerary/itinerary.component";
import { GuestScreenComponent } from "./pages/guestScreen/guestScreen.component";
import { LoginComponent } from "./pages/login/login.component";
import { StaffScreenComponent } from "./pages/staffPages/staffScreen/staffScreen.component";
import { StaffHomeComponent } from "./pages/staffPages/staffHome/staffHome.component";
import { StaffTaskDetailComponent } from "./pages/staffPages/staffTaskDetail/staffTaskDetail.component";
import { StaffChatSelectorComponent } from "./pages/staffPages/staffChatSelector/staffChatSelector.component";
import { StaffChatComponent } from "./pages/staffPages/staffChat/staffChat.component";
import { OwnerScreenComponent } from "./pages/ownerPages/ownerScreen/ownerScreen.component";
import { OwnerHomeComponent } from "./pages/ownerPages/ownerHome/ownerHome.component";
import { OwnerTaskDetailComponent } from "./pages/ownerPages/ownerTaskDetail/ownerTaskDetail.component";
import { OwnerChatSelectorComponent } from "./pages/ownerPages/ownerChatSelector/ownerChatSelector.component";
import { OwnerChatComponent } from "./pages/ownerPages/ownerChat/ownerChat.component";
import { StaffTaskMaker } from "./pages/staffPages/staffTaskMaker/staffTaskMaker.component";
import { OwnerTaskMaker } from "./pages/ownerPages/ownerTaskMaker/ownerTaskMaker.component";

export const routes: RouterConfig = [
    { path: "", redirectTo: "/Login", pathMatch: "full" },
    { path: "Login", component: LoginComponent },
    {
        path: "StaffScreen", component: StaffScreenComponent, children: [
            { path: "", redirectTo: "/StaffScreen/Home", pathMatch: "full" },
            { path: "Home", component: StaffHomeComponent },
            { path: "TaskDetail", component: StaffTaskDetailComponent },
            { path: "TaskMaker", component: StaffTaskMaker },
            { path: "ChatSelector", component: StaffChatSelectorComponent },
            { path: "Chat", component: StaffChatComponent },
        ]
    },
    {
        path: "OwnerScreen", component: OwnerScreenComponent, children: [
            { path: "", redirectTo: "/OwnerScreen/Home", pathMatch: "full" },
            { path: "Home", component: OwnerHomeComponent },
            { path: "TaskDetail", component: OwnerTaskDetailComponent },
            { path: "TaskMaker", component: OwnerTaskMaker },
            { path: "ChatSelector", component: OwnerChatSelectorComponent },
            { path: "Chat", component: OwnerChatComponent },
        ]
    },
    {
        path: "GuestScreen", component: GuestScreenComponent, children: [
            { path: "", redirectTo: "/GuestScreen/Home", pathMatch: "full" },
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
            { path: 'Reservation', component: ReservationComponent },
            { path: 'MakeRequests', component: MakeRequestsComponent },
            { path: 'RequestDetails', component: RequestDetailsComponent },
            { path: 'ForgotSomething', component: ForgotSomethingComponent },
            { path: 'TidyUp', component: TidyUpComponent },
            { path: 'Maintenance', component: MaintenanceComponent },
            { path: 'Itinerary', component: ItineraryComponent }
        ]
    }
];

export const APP_ROUTER_PROVIDERS = [
    nsProvideRouter(routes, {})
];

import "reflect-metadata";
import {nativeScriptBootstrap} from "nativescript-angular/application";
require('nativescript-websockets'); // VERY IMPORTANT this comes BEFORE import of root component below!
import {AppComponent} from "./app.component";
import { APP_ROUTER_PROVIDERS } from "./app.routes"
import {HTTP_PROVIDERS} from "@angular/http";
import {WeatherService} from "./services/weather.service";
import {OfferService} from "./services/offer.service";
import {RestaurantsService} from  "./services/restaurants.service";
import {MenuService} from "./services/menu.service";
import {ChatService} from "./services/chatServices/chat.service";
import {UserIdService} from "./services/userId.service";

nativeScriptBootstrap(AppComponent, [HTTP_PROVIDERS, APP_ROUTER_PROVIDERS, WeatherService, OfferService, RestaurantsService, MenuService, ChatService, UserIdService]);
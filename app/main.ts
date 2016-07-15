// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from "nativescript-angular/application";
require('nativescript-websockets'); // VERY IMPORTANT this comes BEFORE import of root component below!
import {AppComponent} from "./app.component";
import {HTTP_PROVIDERS} from "@angular/http";
import {WeatherService} from "./services/weather.service";
import {OfferService} from "./services/offer.service";
import {RestaurantsService} from  "./services/restaurants.service";
import {MenuService} from "./services/menu.service";
import {AdminHorizonService} from "./services/chatServices/adminHorizon.service";

nativeScriptBootstrap(AppComponent,[HTTP_PROVIDERS, WeatherService,OfferService,RestaurantsService,MenuService, AdminHorizonService]);
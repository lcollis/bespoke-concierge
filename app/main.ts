// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {AppComponent} from "./app.component";
import {HTTP_PROVIDERS} from "@angular/http";
import {WeatherService} from "./services/weather.service"

nativeScriptBootstrap(AppComponent, [HTTP_PROVIDERS, WeatherService]);
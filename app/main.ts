import "reflect-metadata";
import {nativeScriptBootstrap} from "nativescript-angular/application";
require('nativescript-websockets'); // VERY IMPORTANT this comes BEFORE import of root component below!
import {AppComponent} from "./app.component";
import {NS_HTTP_PROVIDERS} from 'nativescript-angular/http';
import { APP_ROUTER_PROVIDERS } from "./app.routes"
import {WeatherService} from "./services/weather.service";
import {ChatService} from "./services/chatServices/chat.service";
import {UserIdService} from "./services/userId.service";
import {DatabaseService} from "./services/database.service";
import {TaskService} from "./services/taskServices/task.service";

nativeScriptBootstrap(AppComponent, [NS_HTTP_PROVIDERS, APP_ROUTER_PROVIDERS, WeatherService, ChatService, UserIdService, DatabaseService, TaskService]);
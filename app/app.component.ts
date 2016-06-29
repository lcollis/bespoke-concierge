import { Component } from '@angular/core';
import {RouteConfig} from "@angular/router-deprecated";
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "nativescript-angular/router";
import {HomeComponent} from "./pages/home/home.component";

@Component({
    selector: 'app',
    template: '<page-router-outlet></page-router-outlet>',
    directives: [NS_ROUTER_DIRECTIVES],
    providers: [NS_ROUTER_PROVIDERS]
})


@RouteConfig([
  { path: '/Home', component: HomeComponent, name: "Home", useAsDefault: true }
])


export class AppComponent {}
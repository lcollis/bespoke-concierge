import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS, RouterExtensions} from "nativescript-angular/router";
import {registerElement} from "nativescript-angular/element-registry";
import {Page} from "ui/page";
import { Color } from "color";

@Component({
    selector: 'guestScreen',
    templateUrl: "pages/guestScreen/guestScreen.html",
    directives: [NS_ROUTER_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class GuestScreenComponent {
    constructor(page: Page, _routerExtensions: RouterExtensions) {
        page.actionBarHidden = true;

        //allows for ios statusbar coloring
        page.backgroundSpanUnderStatusBar = true;
        page.backgroundColor = new Color("lightblue");
        try {
            registerElement("StatusBar", () => require("nativescript-statusbar").StatusBar);
        } catch (error) { }
    }
}
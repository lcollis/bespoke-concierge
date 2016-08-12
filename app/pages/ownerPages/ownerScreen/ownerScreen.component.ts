import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS, RouterExtensions} from "nativescript-angular/router";
import {Page} from "ui/page";
import { Color } from "color";
import {registerElement} from "nativescript-angular/element-registry";

@Component({
    selector: 'ownerScreen',
    templateUrl: 'pages/ownerPages/ownerScreen/ownerScreen.html',    
    directives: [NS_ROUTER_DIRECTIVES, ROUTER_DIRECTIVES]

})
export class OwnerScreenComponent {
    constructor(page: Page) {
        page.actionBarHidden = true;

        //allows for ios statusbar coloring
        page.backgroundSpanUnderStatusBar = true;
        page.backgroundColor = new Color("lightblue");
        try {
            registerElement("StatusBar", () => require("nativescript-statusbar").StatusBar);
        } catch (error) { }
    }

    duty() {

    }

    lookup() {
        
    }

    switchPropertyChange(args) {
        console.log("Switch: " + args.propertyName);
    }
}
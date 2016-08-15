import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS, RouterExtensions} from "nativescript-angular/router";
import {Page} from "ui/page";
import { Color } from "color";
import {registerElement} from "nativescript-angular/element-registry";
import { TaskService } from "../../../services/taskServices/task.service";

@Component({
    selector: 'staffScreen',
    templateUrl: 'pages/staffPages/staffScreen/staffScreen.html',    
    directives: [NS_ROUTER_DIRECTIVES, ROUTER_DIRECTIVES]

})
export class StaffScreenComponent {
    constructor(page: Page, private _router: Router, private _taskService: TaskService) {
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

    home() {
        this._router.navigate(['/StaffScreen/Home']);
        this._taskService.callUpdateTaskListCallback();
    }

    switchPropertyChange(args) {
        console.log("Switch: " + args.propertyName);
    }
}
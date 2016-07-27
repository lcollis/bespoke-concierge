import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import fs = require("file-system");

@Component({
    selector: 'adminHome',
    templateUrl: 'pages/adminHome/adminHome.html',
    styleUrls: ['pages/home/home.css']
})
export class AdminHomeComponent {
    constructor(private _router: Router) { }

    chat() {
        console.log("chat selector");
        
        this._router.navigate(['/AdminChatSelector']);
    }

    onNavBtnTap() {
        this._router.navigate(['/Home']);
    }

    registerAdmin() {
        //this.adminHz.registerAsAdmin();
    }
}
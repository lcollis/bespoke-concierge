import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AdminHorizonService} from "../../services/chatServices/adminHorizon.service";
import fs = require("file-system");

@Component({
    selector: 'adminHome',
    templateUrl: 'pages/adminHome/adminHome.html',
    styleUrls: ['pages/home/home.css']
})
export class AdminHomeComponent {
    constructor(private _router: Router, private adminHz: AdminHorizonService) { }

    chat() {
        this._router.navigate(['AdminChatSelector']);
    }

    onNavBtnTap() {
        this._router.navigate(['/Home']);
    }

    registerAdmin() {
        this.adminHz.registerAsAdmin();
    }
}
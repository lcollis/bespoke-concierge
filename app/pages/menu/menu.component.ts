import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router-deprecated";
import {MenuService} from "../../services/menu.service";
import {Menu} from "../../services/menu";
import appModule = require("application");

@Component({
    selector: 'menu',
    templateUrl: 'pages/menu/menu.html',
    styleUrls: ['pages/menu/menu.css'],
    providers: [MenuService]
})

export class MenuComponent implements OnInit {
    menu: Menu[];
   
    loading: boolean = true;

    constructor(private _router: Router, private _menu:MenuService) {
        _menu.loadMenu().subscribe(
            menu => this.getMenu(menu),
            error => this.receivingError(error));
    }
  
    getMenu(menu) {
        this.menu = menu._body;
        this.loading = false;
    }
    receivingError(error) {
        console.error(error.status);
        alert("No Internet Connection");
        this._router.navigate(["Home"]);
    }
    ngOnInit() { }

    onNavBtnTap() {
        this._router.navigate(["Home"]);
    }
}
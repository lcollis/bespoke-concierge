import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";
import {Menu} from "../../services/menu";
import { TextService } from "../../services/text.service";

@Component({
    selector: 'menu',
    templateUrl: 'pages/menu/menu.html',
    styleUrls: ['pages/menu/menu.css']
})

export class MenuComponent implements OnInit {
    menu: Menu[];
   
    loading: boolean = true;

    constructor(private _router: Router, private _databaseService: DatabaseService, private _textService: TextService) {
        _databaseService.getApiData("Menu").subscribe(
            menu => this.getMenu(menu),
            error => this.receivingError(error));
    }
  
    getMenu(menu) {
        this.menu = menu._body;
        this.loading = false;
    }
    receivingError(error) {
        console.error(error.status);
        alert(this._textService.getText().serverError);
        this._router.navigate(["/GuestScreen/Home"]);
    }
    ngOnInit() { }

    onNavBtnTap() {
        this._router.navigate(["/GuestScreen/Home"]);
    }
}

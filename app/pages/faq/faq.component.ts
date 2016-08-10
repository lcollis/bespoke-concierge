import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";
import { Faq } from "../../services/Faq";

@Component({
    selector: 'faq',
    templateUrl: 'pages/faq/faq.html',
    styleUrls: ['pages/faq/faq.css']
})

export class FaqComponent  {
    faq: Faq[];
   
    loading: boolean = true;

    constructor(private _router: Router, private _databaseService: DatabaseService) {
        _databaseService.getApiData("Faq").subscribe( 
            (data) => this.gotFaq(data),
            (error) => this.gotError(error)
        );
    }
  
    gotFaq(faq) {  
        this.faq = faq._body;
        this.loading = false;
    }
    
    gotError(error) {
        console.error(error.status);
        alert("No Internet Connection");
        this._router.navigate(["/GuestScreen/Home"]);
    }
}
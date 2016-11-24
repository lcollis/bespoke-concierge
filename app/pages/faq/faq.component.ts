import { Component, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";
import { Faq } from "../../services/Faq";
import { TextService } from "../../services/text.service";

@Component({
    selector: 'faq',
    templateUrl: 'pages/faq/faq.html',
    styleUrls: ['pages/faq/faq.css']
})

export class FaqComponent  {
    faq: Faq[];
    folded: boolean[];
   
    loading: boolean = true;

    @ViewChild("listview") listView;

    constructor(private _router: Router, private _databaseService: DatabaseService, private _textService: TextService) {
        _databaseService.getApiData("Faq").subscribe( 
            (data) => this.gotFaq(data),
            (error) => this.gotError(error)
        );
    }
  
    gotFaq(faq) {  
        this.faq = faq._body;

        this.folded = new Array(this.faq.length);
        for (var i = 0; i < this.folded.length; ++i) { this.folded[i] = true; }
        console.log("folded: " + JSON.stringify(this.folded));

        this.loading = false;
    }

    onItemTap(args) {
        var index = args.index;
        this.folded[index] = !this.folded[index];
        console.log(JSON.stringify(this.folded));
        this.listView._elementRef.nativeElement.refresh();
    }

    isFolded(item: Faq): boolean {
        var index = this.faq.indexOf(item);
        return this.folded[index];
    }
    
    gotError(error) {
        console.error(error.status);
        alert(this._textService.getText().serverError);
        this._router.navigate(["/GuestScreen/Home"]);
    }
}

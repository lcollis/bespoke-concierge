import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {openUrl} from "utils/utils";

@Component({
    selector: 'socialMedia',
    templateUrl: 'pages/socialMedia/socialMedia.html',
    styleUrls: ['pages/socialMedia/socialMedia.css']
})
export class SocialMediaComponent implements OnInit {
    constructor(private _router: Router) { }

    ngOnInit() { }

    onNavBtnTap() {
        this._router.navigate(["/GuestScreen/Home"]);
    }

    facebook() {
        console.log("pressing facebook");
        openUrl("https://www.facebook.com/anchorage1770/");
    }

    instagram() {
        openUrl("https://www.instagram.com/anchorage1770/");
    }

    twitter() {
        openUrl("https://twitter.com/Anchorage1770");
    }

    blog() {
        openUrl("http://anchorage1770.com/blog/");
    }
}
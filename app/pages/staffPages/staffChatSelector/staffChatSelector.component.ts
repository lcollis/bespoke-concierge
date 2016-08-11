import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'staffChatSelector',
    templateUrl: 'pages/staffChatSelector/staffChatSelector.html',
    styleUrls: ['pages/staffChatSelector/staffChatSelector.css']
})
export class StaffChatSelectorComponent {
    constructor(private _router:Router) { }

}
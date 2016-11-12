import {Component, Input} from '@angular/core';
import {ModalDialogParams} from "nativescript-angular/directives/dialogs";

@Component({
    selector: 'modal-content',
    template: `
    <StackLayout margin="24" horizontalAlignment="center" verticalAlignment="center">
        <DatePicker [(ngModel)]="date" *ngIf="hasDate"></DatePicker>
        <TimePicker [(ngModel)]="date" *ngIf="!hasDate"></TimePicker> 
        <Button text="done" (tap)="done()"></Button>
    </StackLayout>
    `
})
export class PickerModal {
    
    @Input() public hasDate: boolean;
    @Input() public date: Date;

    constructor(private params: ModalDialogParams) {
        console.log("ModalContent.constructor: " + JSON.stringify(params))
        this.hasDate = params.context.hasDate;
        this.date = params.context.date || new Date();
    }

    done(res: string) {
        this.params.closeCallback(this.date);
    }
}

import { Injectable } from '@angular/core';

@Injectable()
export class HotelInformationService {

    hotelInformation: string = "Veniam proident ex excepteur nisi aliquip magna. Pariatur ea id id proident enim commodo ut. Irure ut qui minim tempor incididunt excepteur ullamco do irure in culpa veniam non. Ullamco Lorem et ut id Lorem eiusmod ad nostrud irure. Ullamco quis magna adipisicing tempor quis incididunt reprehenderit sunt ut enim labore est exercitation. Pariatur mollit incididunt non ullamco tempor eu sunt sunt. Ipsum proident Lorem nulla aliqua.";

    getHotelInformation() {
        return this.hotelInformation;
    }
}
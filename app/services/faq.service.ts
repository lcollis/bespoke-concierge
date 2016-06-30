import { Injectable } from '@angular/core';

@Injectable()
export class FaqService {

    faq: string = "Consequat quis in amet magna. Quis Lorem voluptate ipsum quis. Reprehenderit exercitation laboris commodo voluptate consequat eiusmod ut enim veniam fugiat. Exercitation reprehenderit mollit dolore sunt laboris est et nostrud nostrud nulla elit labore deserunt excepteur. Magna enim tempor veniam fugiat anim sunt magna ullamco esse nulla laborum. Culpa cillum nisi ut magna. Amet laboris elit culpa nisi incididunt fugiat nostrud.";

    getFaq() {
        return this.faq;
    }

}
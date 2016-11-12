// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {ModalDialogService} from "nativescript-angular/modal-dialog";
import { AppComponent } from "./app.component";
import { navigatableComponents, routes } from "./app.routes";
import { FromNowPipe } from "./pipes/fromnow.pipe";
import { MomentPipe } from "./pipes/moment.pipe";
import { ToLocalTimePipe } from "./pipes/toLocalTime.pipe";
import { PickerModal } from "./pages/modals/pickerModal.component";

@NgModule({
    declarations: [
        AppComponent,
        ...navigatableComponents,
        FromNowPipe,
        MomentPipe,
        ToLocalTimePipe,
    ],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes)
    ],
    providers: [ModalDialogService],
    entryComponents: [PickerModal],
})
class AppComponentModule {}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);

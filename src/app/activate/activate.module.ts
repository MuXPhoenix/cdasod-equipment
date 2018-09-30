import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ActivateComponent} from "./activate.component";
import {RouterModule} from "@angular/router";
// import {MenuModule} from "../menu/menu.module";

@NgModule({
    declarations: [
        ActivateComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
        // MenuModule,
      RouterModule.forChild([
        { path: '', component: ActivateComponent }
      ])
    ],
    // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ActivateModule { }

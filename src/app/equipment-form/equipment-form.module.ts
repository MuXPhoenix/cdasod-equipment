import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {EquipmentFormComponent} from "./equipment-form.component";
import {RouterModule} from "@angular/router";
// import {MenuModule} from "../menu/menu.module";

@NgModule({
  declarations: [
    EquipmentFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // MenuModule,
    RouterModule.forChild([
      { path: '', component: EquipmentFormComponent }
    ])
  ]
})
export class EquipmentFormModule { }

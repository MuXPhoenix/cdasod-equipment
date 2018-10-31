import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MqttComponent} from "./mqtt.component";
import {RouterModule} from "@angular/router";
import {MenuModule} from "../menu/menu.module";

@NgModule({
  declarations: [
    MqttComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MenuModule,
    RouterModule.forChild([
      { path: '', component: MqttComponent }
    ])
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MqttModule { }

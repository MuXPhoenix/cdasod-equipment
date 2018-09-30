import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MqttComponent} from "./mqtt.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    MqttComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // MenuModule,
    RouterModule.forChild([
      { path: '', component: MqttComponent }
    ])
  ]
})
export class MqttModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ModbusComponent} from "./modbus.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    ModbusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // MenuModule,
    RouterModule.forChild([
      { path: '', component: ModbusComponent }
    ])
  ]
})
export class ModbusModule { }

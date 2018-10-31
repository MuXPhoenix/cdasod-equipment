import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ModbusComponent} from "./modbus.component";
import {RouterModule} from "@angular/router";
// import {MenuComponent} from "../menu/menu.component";
import {MenuModule} from "../menu/menu.module";

@NgModule({
  declarations: [
    ModbusComponent,
    // MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MenuModule,
    RouterModule.forChild([
      { path: '', component: ModbusComponent }
    ])
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ModbusModule { }

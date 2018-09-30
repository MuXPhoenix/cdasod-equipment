import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {LoginComponent} from "./login.component";
import {RouterModule} from "@angular/router";
// import {MenuModule} from "../menu/menu.module";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // MenuModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent }
    ])
  ]
})
export class LoginModule { }

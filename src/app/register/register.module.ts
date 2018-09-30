import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RegisterComponent} from "./register.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // MenuModule,
    RouterModule.forChild([
      { path: '', component: RegisterComponent }
    ])
  ]
})
export class RegisterModule { }

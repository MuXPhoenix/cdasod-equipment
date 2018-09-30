import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./register.component";

export const RegisterRoutes: Routes = [{
    path: '',
    component: RegisterComponent
}];
export const RegisterRoutingModule = RouterModule.forChild(RegisterRoutes);

import { Routes, RouterModule } from '@angular/router';
import {ActivateComponent} from "./activate.component";

export const ActivateRoutes: Routes = [{
    path: '',
    component: ActivateComponent
}];
export const ActivateRoutingModule = RouterModule.forChild(ActivateRoutes);

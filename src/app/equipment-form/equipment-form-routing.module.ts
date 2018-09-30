import { Routes, RouterModule } from '@angular/router';
import {EquipmentFormComponent} from "./equipment-form.component";

export const EquipmentFormRoutes: Routes = [{
    path: '',
    component: EquipmentFormComponent
}];
export const EquipmentFormRoutingModule = RouterModule.forChild(EquipmentFormRoutes);

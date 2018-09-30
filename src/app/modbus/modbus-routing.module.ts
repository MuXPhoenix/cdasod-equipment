import { Routes, RouterModule } from '@angular/router';
import {ModbusComponent} from "./modbus.component";

export const ModbusRoutes: Routes = [{
    path: '',
    component: ModbusComponent
}];
export const ModbusRoutingModule = RouterModule.forChild(ModbusRoutes);

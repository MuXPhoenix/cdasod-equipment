import { Routes, RouterModule } from '@angular/router';
import {MqttComponent} from "./mqtt.component";

export const MqttRoutes: Routes = [{
    path: '',
    component: MqttComponent
}];
export const MqttRoutingModule = RouterModule.forChild(MqttRoutes);

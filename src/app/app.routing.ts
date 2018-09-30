/**
 * Created by griga on 7/11/16.
 */
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {AppComponent} from "./app.component";
import {LoginModule} from "./login/login.module";
import {ActivateModule} from "./activate/activate.module";
import {MqttModule} from "./mqtt/mqtt.module";
import {ModbusModule} from "./modbus/modbus.module";
import {RegisterModule} from "./register/register.module";
import {EquipmentFormModule} from "./equipment-form/equipment-form.module";
// import {MqttComponent} from "./mqtt/mqtt.component";

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    data: {pageTitle: 'Home'},
    children: [
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'login',
          loadChildren: () => LoginModule
      },
      {
        path: 'register',
        loadChildren: () => RegisterModule
      },
      {
          path: 'activate',
          loadChildren: () => ActivateModule
      },
      {
        path: 'modbus',
        loadChildren: () => ModbusModule
      },
      {
        path: 'mqtt',
        loadChildren: () => MqttModule
      },
      {
        path: 'setting/:id',
        loadChildren: () => EquipmentFormModule
      }

    ]
  }
  // {
  //   path: 'mqtt',
  //   component: MqttComponent,
  //
  // }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});

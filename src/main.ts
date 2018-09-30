import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


platformBrowserDynamic().bootstrapModule(AppModule);
// platformBrowserDynamic([{provide: PLATFORM_INITIALIZER, useValue: test, multi: true}]).bootstrapModule(AppModule);


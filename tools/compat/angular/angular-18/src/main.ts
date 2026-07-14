import { bootstrapApplication } from '@angular/platform-browser';
import { setAssetPath } from '@parlamentsdienste/pdcomponents-core/components';
import { AppComponent } from './app/app.component';

setAssetPath('http://localhost:4200');

bootstrapApplication(AppComponent).catch(error => console.error(error));

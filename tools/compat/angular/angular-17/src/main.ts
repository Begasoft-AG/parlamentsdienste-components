import { bootstrapApplication } from '@angular/platform-browser';
import { setAssetPath } from '@parlamentsdienste/pdcomponents-core/components';
import { AngularFormComponent } from './app/angular-form.component';

setAssetPath('http://localhost:4200');

bootstrapApplication(AngularFormComponent).catch(error => console.error(error));

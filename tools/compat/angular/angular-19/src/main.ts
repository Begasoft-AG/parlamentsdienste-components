import { provideAppInitializer } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { setAssetPath } from '@parlamentsdienste/pdcomponents-core/components';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
        provideAppInitializer(() => {
            setAssetPath('http://localhost:4200');
        }),
    ],
}).catch(error => console.error(error));

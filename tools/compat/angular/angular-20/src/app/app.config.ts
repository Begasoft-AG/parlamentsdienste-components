import {
    ApplicationConfig,
    provideAppInitializer,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection,
} from '@angular/core';
import { setAssetPath } from '@parlamentsdienste/pdcomponents-core/components';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideAppInitializer(() => {
            setAssetPath('http://localhost:4200');
        }),
        provideZoneChangeDetection({ eventCoalescing: true }),
    ],
};

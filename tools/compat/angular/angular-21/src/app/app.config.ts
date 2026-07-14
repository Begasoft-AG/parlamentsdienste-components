import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { setAssetPath } from '@parlamentsdienste/pdcomponents-core/components';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideAppInitializer(() => {
            setAssetPath('http://localhost:4200');
        }),
    ],
};

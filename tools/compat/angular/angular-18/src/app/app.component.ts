import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PdButton } from '@parlamentsdienste/pdcomponents-angular';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [PdButton],
    template: '<pd-button>Compat</pd-button>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}

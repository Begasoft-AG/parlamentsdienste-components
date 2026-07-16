/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdPanel } from '@parlamentsdienste/pdcomponents-core/components/pd-panel.js';
@ProxyCmp({
  defineCustomElementFn: definePdPanel,
  inputs: ['collapsed', 'collapsible', 'subpanel']
})
@Component({
  selector: 'pd-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['collapsed', 'collapsible', 'subpanel'],
  outputs: ['pd-collapsed'],
  
  standalone: true,
  
})
export class PdPanel {
  protected nativeEl: HTMLPdPanelElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-collapsed']);
  }

  
}


import type { PdPanelCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdPanel extends Components.PdPanel {
  /**
   * Emitted when the value has changed.
   */
  'pd-collapsed': EventEmitter<PdPanelCustomEvent<any>>;
}



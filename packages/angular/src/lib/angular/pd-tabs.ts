/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdTabs } from '@parlamentsdienste/pdcomponents-core/components/pd-tabs.js';
@ProxyCmp({
  defineCustomElementFn: definePdTabs,
  inputs: ['light', 'tabs']
})
@Component({
  selector: 'pd-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['light', 'tabs'],
  outputs: ['pd-change'],
  
  standalone: true,
  
})
export class PdTabs {
  protected nativeEl: HTMLPdTabsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-change']);
  }

  
}


import type { PdTabsCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';
import type { TabValue as IPdTabsTabValue } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdTabs extends Components.PdTabs {
  /**
   * Emitted when the value has changed.
   */
  'pd-change': EventEmitter<PdTabsCustomEvent<IPdTabsTabValue>>;
}



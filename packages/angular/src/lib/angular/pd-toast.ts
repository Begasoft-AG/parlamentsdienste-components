/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdToast } from '@parlamentsdienste/pdcomponents-core/components/pd-toast.js';
@ProxyCmp({
  defineCustomElementFn: definePdToast,
  inputs: ['header', 'info', 'size']
})
@Component({
  selector: 'pd-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['header', 'info', 'size'],
  outputs: ['pd-closed'],
  
  standalone: true,
  
})
export class PdToast {
  protected nativeEl: HTMLPdToastElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-closed']);
  }

  
}


import type { PdToastCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdToast extends Components.PdToast {
  /**
   * When closing the toast using the close icon
   */
  'pd-closed': EventEmitter<PdToastCustomEvent<any>>;
}



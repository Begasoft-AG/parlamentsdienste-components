/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdBackdrop } from '@parlamentsdienste/pdcomponents-core/components/pd-backdrop.js';
@ProxyCmp({
  defineCustomElementFn: definePdBackdrop,
  inputs: ['visible']
})
@Component({
  selector: 'pd-backdrop',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['visible'],
  outputs: ['pd-tap'],
  
  standalone: true,
  
})
export class PdBackdrop {
  protected nativeEl: HTMLPdBackdropElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-tap']);
  }

  
}


import type { PdBackdropCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdBackdrop extends Components.PdBackdrop {

  'pd-tap': EventEmitter<PdBackdropCustomEvent<void>>;
}



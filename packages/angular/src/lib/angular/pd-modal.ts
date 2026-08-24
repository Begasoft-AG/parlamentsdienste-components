/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdModal } from '@parlamentsdienste/pdcomponents-core/components/pd-modal.js';
@ProxyCmp({
  defineCustomElementFn: definePdModal,
  inputs: ['config']
})
@Component({
  selector: 'pd-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['config'],
  outputs: ['pd-closed', 'pd-backdrop', 'pd-escape'],
  
  standalone: true,
  
})
export class PdModal {
  protected nativeEl: HTMLPdModalElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-closed', 'pd-backdrop', 'pd-escape']);
  }

  
}


import type { PdModalCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdModal extends Components.PdModal {
  /**
   * Event that will be executed when the is closed
   */
  'pd-closed': EventEmitter<PdModalCustomEvent<void>>;
  /**
   * Event that will be executed when the modal backdrop is clicked
   */
  'pd-backdrop': EventEmitter<PdModalCustomEvent<void>>;
  /**
   * Event that will be executed when the escape button was clicked
   */
  'pd-escape': EventEmitter<PdModalCustomEvent<void>>;
}



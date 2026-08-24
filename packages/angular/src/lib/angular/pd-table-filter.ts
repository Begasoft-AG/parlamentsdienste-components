/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdTableFilter } from '@parlamentsdienste/pdcomponents-core/components/pd-table-filter.js';
@ProxyCmp({
  defineCustomElementFn: definePdTableFilter,
  inputs: ['value'],
  methods: ['reset', 'setValue', 'focusInput']
})
@Component({
  selector: 'pd-table-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['value'],
  outputs: ['pd-confirm', 'pd-close', 'pd-filter-input'],
  
  standalone: true,
  
})
export class PdTableFilter {
  protected nativeEl: HTMLPdTableFilterElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-confirm', 'pd-close', 'pd-filter-input']);
  }

  
}


import type { PdTableFilterCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdTableFilter extends Components.PdTableFilter {
  /**
   * Emitted when filter is confirmed.
   */
  'pd-confirm': EventEmitter<PdTableFilterCustomEvent<string>>;
  /**
   * Emitted when filter is confirmed.
   */
  'pd-close': EventEmitter<PdTableFilterCustomEvent<void>>;
  /**
   * Emitted when filter input value changed.
   */
  'pd-filter-input': EventEmitter<PdTableFilterCustomEvent<string>>;
}



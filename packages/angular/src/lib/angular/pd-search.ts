/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdSearch } from '@parlamentsdienste/pdcomponents-core/components/pd-search.js';
@ProxyCmp({
  defineCustomElementFn: definePdSearch,
  inputs: ['disabled', 'highlight', 'label', 'placeholder', 'results', 'size', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'pd-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'highlight', 'label', 'placeholder', 'results', 'size', 'value'],
  outputs: ['pd-input', 'pd-change', 'pd-search', 'pd-blur', 'pd-focus'],
  
  standalone: true,
  
})
export class PdSearch {
  protected nativeEl: HTMLPdSearchElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-input', 'pd-change', 'pd-search', 'pd-blur', 'pd-focus']);
  }

  
}


import type { PdSearchCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';
import type { InputChangeEventDetail as IPdSearchInputChangeEventDetail } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdSearch extends Components.PdSearch {
  /**
   * Emitted when a keyboard input occurred.
   */
  'pd-input': EventEmitter<PdSearchCustomEvent<IPdSearchInputChangeEventDetail>>;
  /**
   * Emitted when the value has changed.
   */
  'pd-change': EventEmitter<PdSearchCustomEvent<IPdSearchInputChangeEventDetail>>;
  /**
   * Emitted when a search request occurred.
   */
  'pd-search': EventEmitter<PdSearchCustomEvent<IPdSearchInputChangeEventDetail>>;
  /**
   * Emitted when the input loses focus.
   */
  'pd-blur': EventEmitter<PdSearchCustomEvent<void>>;
  /**
   * Emitted when the input has focus.
   */
  'pd-focus': EventEmitter<PdSearchCustomEvent<void>>;
}



/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdSort } from '@parlamentsdienste/pdcomponents-core/components/pd-sort.js';
@ProxyCmp({
  defineCustomElementFn: definePdSort,
  inputs: ['disabled', 'emptyItem', 'emptyItemData', 'itemCount', 'items', 'label', 'placeholder', 'reverseItem', 'reverseItemData'],
  methods: ['setSelectedIndex', 'reset']
})
@Component({
  selector: 'pd-sort',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'emptyItem', 'emptyItemData', 'itemCount', 'items', 'label', 'placeholder', 'reverseItem', 'reverseItemData'],
  outputs: ['pd-change', 'pd-reverse'],
  
  standalone: true,
  
})
export class PdSort {
  protected nativeEl: HTMLPdSortElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-change', 'pd-reverse']);
  }

  
}


import type { PdSortCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';
import type { SortDropdownItem as IPdSortSortDropdownItem } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdSort extends Components.PdSort {

  'pd-change': EventEmitter<PdSortCustomEvent<IPdSortSortDropdownItem>>;

  'pd-reverse': EventEmitter<PdSortCustomEvent<IPdSortSortDropdownItem>>;
}


